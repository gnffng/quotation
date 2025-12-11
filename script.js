let dbData = [];

const SPREADSHEET_ID = '1XSlDMf5VfyvHDP34UfhZOqi7Ut9S8O5YyfIU6gStb4o';
const API_KEY = 'AIzaSyCaIDDhgfiksCQKNeyBuDLAco4DRFk4p2g';
const SHEET_NAME = 'data'; // 데이터를 가져올 시트 이름 (예: Sheet1)

const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

async function fetchGoogleSheetData() {
    try {
        const response = await fetch(url); // Google Sheets API에서 데이터를 가져옵니다.
        const data = await response.json();
        const rows = data.values; // 실제 데이터 배열 (2D array)

        for(let i=1; i<rows.length; i++){
            let row = rows[i];
            if(row.length < 5) continue;
            dbData.push({
                kind: row.length > 0 ? row[0] : "",
                detail: row.length > 1 ? row[1] : "",
                spec: row.length > 2 ? row[2] : "",
                unit: row.length > 3 ? row[3] : "",
                price: row.length > 4 ? parseInt(row[4]) : 0,
                type: row.length > 5 ? row[5] : "",
                note: row.length > 6 ? row[6] : "",
            });
        }

    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
    }
}

fetchGoogleSheetData();

// 상태 변수: 현재 선택된 자재의 특수 타입 및 기준 단가 저장
let currentItemType = "";
let currentBasePrice = 0;

// --- 2. 상태 관리 ---
let mainItems = []; 
let itemIdCounter = 0;
let subIdCounter = 0;

// --- 3. 렌더링 함수 ---
const mainTbody = document.getElementById('mainTbody');

function render() {
    mainTbody.innerHTML = "";
    
    mainItems.forEach(item => {
        // Main Row
        const tr = document.createElement('tr');
        tr.className = "main-row";
        tr.innerHTML = `
            <td><input type="text" value="${item.name}" onchange="updateMainInfo(${item.id}, 'name', this.value)"></td>
            <td><input type="text" value="${item.spec}" onchange="updateMainInfo(${item.id}, 'spec', this.value)"></td>
            <td><input type="text" value="${item.material}" onchange="updateMainInfo(${item.id}, 'material', this.value)"></td>
            <td><input type="number" value="${item.qty}" onchange="updateMainInfo(${item.id}, 'qty', this.value)"></td>
            <td><input type="text" value="${Math.round(item.unitPrice).toLocaleString()}" readonly style="text-align:right;"></td>
            <td><input type="text" value="${Math.round(item.totalAmount).toLocaleString()}" readonly style="text-align:right; font-weight:bold;"></td>
            <td><input type="text" value="${item.note}" onchange="updateMainInfo(${item.id}, 'note', this.value)"></td>
            <td>
                <button class="btn btn-success" style="padding:2px 5px; font-size:11px;" onclick="openSubModal(${item.id})">자재+</button>
                <button class="btn btn-danger" style="padding:2px 5px; font-size:11px;" onclick="deleteMainItem(${item.id})">삭제</button>
            </td>
        `;
        mainTbody.appendChild(tr);

        // Sub Row
        if (item.subItems.length > 0) {
            const subTr = document.createElement('tr');
            subTr.className = "sub-row";
            
            let subHtml = `
                <td colspan="8">
                    <div class="sub-content">
                        <strong style="font-size:12px; color:#007bff;">└ ${item.name} 구성 자재 목록</strong>
                        <table class="material-table">
                            <thead>
                                <tr>
                                    <th>자재명</th>
                                    <th>규격</th>
                                    <th style="width:50px">단위</th>
                                    <th style="width:50px">공수</th>
                                    <th style="width:60px">수량</th>
                                    <th style="width:80px">단가</th>
                                    <th style="width:80px">금액</th>
                                    <th>비고</th>
                                    <th style="width:40px"></th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            item.subItems.forEach(sub => {
                const lineTotal = Math.round(sub.price * sub.qty * sub.multiplier);
                subHtml += `
                    <tr>
                        <td>${sub.name}</td>
                        <td>${sub.spec}</td>
                        <td>${sub.unit}</td>
                        <td>${sub.multiplier.toFixed(2)}</td>
                        <td><input type="number" value="${sub.qty}" style="width:100%" onchange="updateSubItem(${item.id}, ${sub.subId}, 'qty', this.value)"></td>
                        <td><input type="number" value="${sub.price}" style="width:100%" onchange="updateSubItem(${item.id}, ${sub.subId}, 'price', this.value)"></td>
                        <td style="text-align:right;">${lineTotal.toLocaleString()}</td>
                        <td><input type="text" value="${sub.note}" style="width:100%" onchange="updateSubItem(${item.id}, ${sub.subId}, 'note', this.value)"></td>
                        <td><button class="btn btn-danger" style="padding:2px 5px;" onclick="deleteSubItem(${item.id}, ${sub.subId})">x</button></td>
                    </tr>
                `;
            });

            subHtml += `</tbody></table></div></td>`;
            subTr.innerHTML = subHtml;
            mainTbody.appendChild(subTr);
        }
    });
}

// --- 4. 로직 처리 함수 ---

function addMainItem() {
    const name = document.getElementById('m_name').value;
    if(!name) { showAlert("품명을 입력하세요."); return; }

    mainItems.push({
        id: itemIdCounter++,
        name,
        spec: document.getElementById('m_spec').value,
        material: document.getElementById('m_material').value,
        qty: parseInt(document.getElementById('m_qty').value) || 0,
        note: document.getElementById('m_note').value,
        unitPrice: 0,
        totalAmount: 0,
        subItems: []
    });

    closeModal('mainModal');
    render();
}

function updateMainInfo(id, field, value) {
    const item = mainItems.find(i => i.id === id);
    if(!item) return;
    if(field === 'qty') item.qty = parseInt(value) || 0;
    else item[field] = value;
    recalc(item);
    render();
}

function deleteMainItem(id) {
    if(confirm("정말 삭제하시겠습니까?")) {
        mainItems = mainItems.filter(i => i.id !== id);
        render();
    }
}

function addSubItem() {
    const mainId = parseInt(document.getElementById('currentMainId').value);
    const item = mainItems.find(i => i.id === mainId);
    
    const kind = document.getElementById('s_kind').value;
    const detail = document.getElementById('s_detail').value;
    let spec = document.getElementById('s_spec').value;
    const unit = document.getElementById('s_unit').value;
    const price = parseInt(document.getElementById('s_price').value) || 0;
    const qty = parseInt(document.getElementById('s_qty').value) || 0;
    const note = document.getElementById('s_note').value;
    
    // [요구사항 반영] 특수 타입인 경우 규격 문자열 수정
    if(currentItemType === 'WOOD' || currentItemType === 'GLASS' || currentItemType === 'POLY') {
        const w = document.getElementById('s_width').value;
        const h = document.getElementById('s_height').value;
        if(w && h) {
            spec = `${w}×${h} ${spec}`;
        }
    }

    let multiplier = parseFloat(document.getElementById('s_multiplier').value) || 1.0;
    if(multiplier < 1.0) multiplier = 1.0;
    if(multiplier > 10.0) multiplier = 10.0;

    if(!kind) { showAlert("자재를 선택하세요."); return; }

    const fullName = `${kind} ${detail}`.trim();

    item.subItems.push({
        subId: subIdCounter++,
        name: fullName,
        spec, unit, price, qty, note, multiplier
    });

    recalc(item);
    closeModal('subModal');
    render();
}

function updateSubItem(mainId, subId, field, value) {
    const item = mainItems.find(i => i.id === mainId);
    const sub = item.subItems.find(s => s.subId === subId);

    if(field === 'qty' || field === 'price') {
        sub[field] = parseInt(value) || 0;
    } else {
        sub[field] = value;
    }
    recalc(item);
    render();
}

function deleteSubItem(mainId, subId) {
    const item = mainItems.find(i => i.id === mainId);
    item.subItems = item.subItems.filter(s => s.subId !== subId);
    recalc(item);
    render();
}

function recalc(item) {
    let sumSubMaterials = 0;
    item.subItems.forEach(sub => {
        sumSubMaterials += (sub.price * sub.qty * sub.multiplier);
    });
    item.unitPrice = sumSubMaterials;
    item.totalAmount = item.unitPrice * item.qty;
}

// --- 5. Export / Import / Print 기능 ---

function exportData() {
    const metaInfo = {
        recipient: document.getElementById('info_recipient').value,
        siteName: document.getElementById('info_siteName').value,
        delivery: document.getElementById('info_delivery').value,
        notes: document.getElementById('info_notes').value
    };

    const exportObj = {
        meta: metaInfo,
        items: mainItems
    };
    
    const jsonStr = JSON.stringify(exportObj, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const now = new Date();
    const fileName = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData(input) {
    const file = input.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const loadedData = JSON.parse(e.target.result);
            let newItems = [];

            if(Array.isArray(loadedData)) {
                newItems = loadedData;
            } else if(loadedData.items && Array.isArray(loadedData.items)) {
                newItems = loadedData.items;
                if(loadedData.meta) {
                    document.getElementById('info_recipient').value = loadedData.meta.recipient || "";
                    document.getElementById('info_siteName').value = loadedData.meta.siteName || "";
                    document.getElementById('info_delivery').value = loadedData.meta.delivery || "";
                    document.getElementById('info_notes').value = loadedData.meta.notes || "";
                }
            } else {
                throw new Error("데이터 형식이 올바르지 않습니다.");
            }
            
            mainItems = newItems;
            
            let maxMainId = 0, maxSubId = 0;
            mainItems.forEach(m => {
                if(m.id >= maxMainId) maxMainId = m.id;
                if(m.subItems) {
                    m.subItems.forEach(s => {
                        if(s.subId >= maxSubId) maxSubId = s.subId;
                    });
                }
            });
            itemIdCounter = maxMainId + 1;
            subIdCounter = maxSubId + 1;

            render();

        } catch (err) {
            console.error(err);
            showAlert("파일 파싱 실패: 형식이 올바르지 않은 JSON 파일입니다.");
        }
    };
    reader.readAsText(file);
}

function triggerImport() {
    document.getElementById('importFile').value = "";
    document.getElementById('importFile').click();
}

function numToKorean(num) {
    if(num == 0) return "영";
    const units = ["", "만", "억", "조"];
    const numChar = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
    const unitX = ["", "십", "백", "천"];
    
    let str = String(num);
    let strLen = str.length;
    let result = "";
    
    for(let i=0; i < strLen; i++) {
        let n = Number(str.charAt(i));
        let digit = strLen - i - 1; 
        
        if(n > 0) {
            result += numChar[n];
            result += unitX[digit % 4];
        }
        
        if(digit % 4 === 0 && digit > 0) {
            result += units[digit / 4];
        }
    }
    return result;
}

function printEstimate() {
    let grandTotal = 0;
    mainItems.forEach(i => grandTotal += i.totalAmount);
    grandTotal = Math.floor(grandTotal);
    
    const recipient = document.getElementById('info_recipient').value || "귀하";
    const siteName = document.getElementById('info_siteName').value || "";
    const deliveryTerms = document.getElementById('info_delivery').value || "";
    const notesStr = document.getElementById('info_notes').value || "";
    const notes = notesStr.split("\n");

    const now = new Date();
    const dateStr = `${now.getFullYear()}년 ${now.getMonth()+1}월 ${now.getDate()}일`;
    
    const korMoney = numToKorean(grandTotal);

    const printContent = `
        <html>
        <head>
            <title>견적서</title>
            <style>
                body { font-family: 'Malgun Gothic', serif; padding: 30px; }
                .wrapper { width: 100%; max-width: 800px; margin: 0 auto; }
                .header-title { text-align: center; font-size: 36px; font-weight: bold; letter-spacing: 20px; margin-bottom: 30px; text-decoration: underline; text-underline-offset: 8px; }
                .top-section { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
                .left-box { width: 40%; font-size: 14px; line-height: 2.0; padding-top: 10px; }
                .left-box .recipient { font-size: 18px; font-weight: bold; border-bottom: 1px solid #000; display: inline-block; min-width: 150px; text-align: center;}
                .left-box .date { margin-top: 10px; font-size: 16px; }
                .right-box { width: 55%; border: 2px solid #333; padding: 5px; box-sizing: border-box; }
                .supplier-table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: center; }
                .supplier-table td { border: 1px solid #888; padding: 5px 2px; height: 20px;}
                .supplier-label { background-color: #f0f0f0; width: 60px; }
                .supplier-vertical { width: 25px; background-color: #f0f0f0; font-weight: bold; vertical-align: middle; }
                .total-bar { border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 10px; margin: 20px 0; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: bold; }
                .total-bar .money { font-size: 18px; }
                .item-table { width: 100%; border-collapse: collapse; border-top: 2px solid #000; border-bottom: 1px solid #000; font-size: 12px; margin-bottom: 20px; }
                .item-table th { border: 1px solid #000; background-color: #eee; padding: 8px; font-weight: normal; }
                .item-table td { border: 1px solid #000; padding: 6px; text-align: center; height: 25px; }
                .text-left { text-align: left !important; padding-left: 5px !important; }
                .text-right { text-align: right !important; padding-right: 5px !important; }
                .footer { font-size: 13px; line-height: 1.8; margin-top: 20px; }
                .footer ul { list-style: none; padding-left: 0; }
                .footer li { margin-bottom: 5px; }
                @media print {
                    body { -webkit-print-color-adjust: exact; margin: 0; padding: 20px; }
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="header-title">견 적 서</div>
                
                <div class="top-section">
                    <div class="left-box">
                        <span class="recipient">${recipient}</span> 귀하(귀중)<br>
                        <div class="date">${dateStr}</div>
                        <div style="margin-top:20px;">아래와 같이 견적합니다.</div>
                    </div>
                    
                    <div class="right-box">
                        <table class="supplier-table">
                            <tr>
                                <td rowspan="5" class="supplier-vertical">공<br>급<br>자</td>
                                <td class="supplier-label">등록번호</td>
                                <td colspan="3" style="font-weight:bold; font-size:13px;">368-07-02091</td>
                            </tr>
                            <tr>
                                <td class="supplier-label">상 호</td>
                                <td>참기업</td>
                                <td class="supplier-label">성 명</td>
                                <td>김태주 (인)</td>
                            </tr>
                            <tr>
                                <td class="supplier-label">주 소</td>
                                <td colspan="3" class="text-left">고양시 일산서구 송포로447번길 137</td>
                            </tr>
                            <tr>
                                <td class="supplier-label">업 태</td>
                                <td>제조업</td>
                                <td class="supplier-label">종 목</td>
                                <td>조경시설물</td>
                            </tr>
                            <tr>
                                <td class="supplier-label">전 화</td>
                                <td colspan="3">010-5286-3796</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="total-bar">
                    <span>합계금액 &nbsp;&nbsp;&nbsp; 金 ${korMoney} 원정</span>
                    <span class="money">(￦${grandTotal.toLocaleString()})</span>
                    <span style="font-size:12px; font-weight:normal;">V.A.T 별도</span>
                </div>

                <div style="text-align:right; font-size:14px; margin-bottom:5px; font-weight:bold;">
                    현장명 : ${siteName} 현장
                </div>

                <table class="item-table">
                    <thead>
                        <tr>
                            <th style="width:25%">품명</th>
                            <th style="width:20%">규격</th>
                            <th style="width:10%">재질</th>
                            <th style="width:8%">수량</th>
                            <th style="width:12%">단가</th>
                            <th style="width:15%">금액</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mainItems.map(item => `
                            <tr>
                                <td class="text-left">${item.name}</td>
                                <td>${item.spec}</td>
                                <td>${item.material}</td>
                                <td>${item.qty}</td>
                                <td class="text-right">${Math.round(item.unitPrice).toLocaleString()}</td>
                                <td class="text-right">${Math.round(item.totalAmount).toLocaleString()}</td>
                                <td>${item.note}</td>
                            </tr>
                        `).join('')}
                        
                        ${Array(Math.max(0, 12 - mainItems.length)).fill(0).map(() => `
                            <tr>
                                <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr style="background-color:#f9f9f9; font-weight:bold;">
                            <td colspan="3">합 계</td>
                            <td></td>
                            <td></td>
                            <td class="text-right">${grandTotal.toLocaleString()}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>

                <div class="footer">
                    <ul>
                        <li>◎ 납품 및 시공 : ${deliveryTerms}.</li>
                        <li>◎ 기타사항 :
                        ${notes.map((item) => `
                            <li>${item}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            <script>
                window.onload = function() { window.print(); }
            <\/script>
        </body>
        </html>
    `;

    const win = window.open('', '_blank');
    win.document.write(printContent);
    win.document.close();
}

// --- 6. 팝업 및 유틸리티 ---
function showAlert(msg) {
    document.getElementById('alertMsgText').innerText = msg;
    document.getElementById('alertModal').style.display = "block";
}

function openMainModal() {
    document.getElementById('m_name').value = "";
    document.getElementById('m_spec').value = "";
    document.getElementById('m_material').value = "";
    document.getElementById('m_qty').value = "1";
    document.getElementById('m_note').value = "";
    document.getElementById('mainModal').style.display = "block";
}

function openSubModal(mainId) {
    document.getElementById('currentMainId').value = mainId;
    
    // 초기화
    document.getElementById('s_kind').innerHTML = '<option value="">선택하세요</option>';
    document.getElementById('s_detail').innerHTML = '<option value="">선택하세요</option>';
    document.getElementById('s_spec').innerHTML = '<option value="">선택하세요</option>';
    document.getElementById('s_unit').value = "";
    document.getElementById('s_price').value = "";
    document.getElementById('s_qty').value = "1";
    document.getElementById('s_note').value = "";
    document.getElementById('s_multiplier').value = "1.00";
    
    // [요구사항 반영] 치수 입력창 초기화 및 숨김
    document.getElementById('dimension_area').style.display = 'none';
    document.getElementById('s_width').value = "";
    document.getElementById('s_height').value = "";
    currentItemType = "";
    currentBasePrice = 0;

    const kinds = [...new Set(dbData.map(d => d.kind))];
    kinds.forEach(k => {
        if(k) {
            const opt = document.createElement('option');
            opt.value = k;
            opt.innerText = k;
            document.getElementById('s_kind').appendChild(opt);
        }
    });
    document.getElementById('subModal').style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function filterDetail() {
    const kind = document.getElementById('s_kind').value;
    const detailSelect = document.getElementById('s_detail');
    const specSelect = document.getElementById('s_spec');
    
    detailSelect.innerHTML = '<option value="">선택하세요</option>';
    specSelect.innerHTML = '<option value="">선택하세요</option>';
    document.getElementById('s_unit').value = "";
    document.getElementById('s_price').value = "";
    document.getElementById('dimension_area').style.display = 'none';

    if(!kind) return;
    const filtered = dbData.filter(d => d.kind === kind);
    const details = [...new Set(filtered.map(d => d.detail))];

    details.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.innerText = d === "" ? "(세부없음)" : d;
        detailSelect.appendChild(opt);
    });
}

function filterSpec() {
    const kind = document.getElementById('s_kind').value;
    const detail = document.getElementById('s_detail').value;
    const specSelect = document.getElementById('s_spec');

    specSelect.innerHTML = '<option value="">선택하세요</option>';
    document.getElementById('s_unit').value = "";
    document.getElementById('s_price').value = "";
    document.getElementById('dimension_area').style.display = 'none';

    const filtered = dbData.filter(d => d.kind === kind && d.detail === detail);
    filtered.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.spec;
        opt.innerText = d.spec === "" ? "(규격없음)" : d.spec;
        opt.dataset.unit = d.unit;
        opt.dataset.price = d.price;
        opt.dataset.type = d.type; // [요구사항 반영] 타입 정보 저장
        specSelect.appendChild(opt);
    });
}

function autoFillData() {
    const specSelect = document.getElementById('s_spec');
    const selectedOpt = specSelect.options[specSelect.selectedIndex];
    if(selectedOpt.value === "" && specSelect.selectedIndex === 0) return;
    
    if(selectedOpt.dataset.unit) {
        document.getElementById('s_unit').value = selectedOpt.dataset.unit;
        
        // [요구사항 반영] 타입에 따른 처리 로직
        currentItemType = selectedOpt.dataset.type || "";
        currentBasePrice = parseInt(selectedOpt.dataset.price) || 0;

        if (currentItemType === 'WOOD' || currentItemType === 'GLASS' || currentItemType === 'POLY') {
            // 치수 입력 영역 보이기
            document.getElementById('dimension_area').style.display = 'block';
            // 초기화: 아직 치수가 입력되지 않았으므로 단가는 0으로 표시하거나 basePrice 표기(여기선 0으로 대기)
            document.getElementById('s_price').value = 0; 
            document.getElementById('s_width').value = "";
            document.getElementById('s_height').value = "";
        } else {
            // 일반 자재
            document.getElementById('dimension_area').style.display = 'none';
            document.getElementById('s_price').value = currentBasePrice;
        }
    }
}

// [요구사항 반영] 동적 단가 계산 함수
function calcDynamicPrice() {
    if (!currentItemType) return;
    
    const w = parseFloat(document.getElementById('s_width').value) || 0;
    const h = parseFloat(document.getElementById('s_height').value) || 0;
    
    let finalPrice = 0;
    
    if (currentItemType === 'WOOD') {
        // [요구사항 1] 가로 * 세로 * 330.75 * 단가
        finalPrice = (w+0.005) * (h+0.005) * 300 * currentBasePrice;
    } else if (currentItemType === 'GLASS') {
        // [요구사항 2] 가로 * 세로 * 단가 / 0.09
        finalPrice = (w * h * currentBasePrice) / 0.09;
    } else if (currentItemType === 'POLY') {
        // [요구사항 3] 가로 * 세로 * 단가
        finalPrice = w * h * currentBasePrice;
    }

    document.getElementById('s_price').value = Math.round(finalPrice);
}