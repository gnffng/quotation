// --- 1. 데이터 준비 (data.csv 시뮬레이션) ---
const rawCsvData = `종류,세부품명,규격,단위,단가,타입,비고
LED,,,M,100000,,
앙카,D19 L300,,EA,1500,,
앙카,D19 L400,,EA,1800,,
앙카,셋트앙카 삼부 일반,,EA,100,,
앙카,셋트앙카 연부 일반,,EA,200,,
앙카,셋트앙카 삼부 스텐,,EA,250,,
H빔,스틸,,KG,1350,,
H빔,,100×100,M,24000,,
H빔,,150×100,M,30000,,
H빔,,150×150,M,34000,,
H빔,,200×100,M,36000,,
H빔,,200×150,M,43000,,
H빔,,200×200,M,70000,,
H빔,,150×300,M,45000,,
H빔,,294×200,M,79000,,
H빔,,400×200,M,92000,,
H빔,톱절단,100×100,EA,3000,,100×100 절단
H빔,톱절단 (45도),100×100,EA,6000,,100×100 45도 절단
H빔,톱절단,150×100,EA,4000,,150×100 절단
H빔,톱절단,150×150,EA,4000,,150×150 절단
H빔,톱절단,200×100,EA,4000,,200×100 절단
잔넬,ㄷ잔넬,100×50,M,50000,,5M 당 단가
잔넬,,100×50,M,60000,,5M 당 단가
잔넬,,200×80,M,150000,,5M 당 단가
목재,손스침(멀바우),70×40,EA,25000,,
목재,(해안) 미송 방부목 사이,,M²,3300,WOOD,가로 * 1.05 * 세로 * 1.05 * 길이 * 300 * 단가
목재,(영풍) 미송 방부목 사이,,M²,3500,WOOD,가로 * 1.05 * 세로 * 1.05 * 길이 * 300 * 단가
목재,(해안) 뉴송 방부목 사이,,M²,2700,WOOD,가로 * 1.05 * 세로 * 1.05 * 길이 * 300 * 단가
목재,(해안) 하드우드(니아또),,M²,6500,WOOD,가로 * 1.05 * 세로 * 1.05 * 길이 * 300 * 단가
목재,(해안) 멀바우,,M²,15000,WOOD,가로 * 1.05 * 세로 * 1.05 * 길이 * 300 * 단가
목재,(해안) 이페 제제목 사이,,M²,21000,WOOD,가로 * 1.05 * 세로 * 1.05 * 길이 * 300 * 단가
목재,(해안) 데크,21T,M²,100000,,1M² 당 단가
목재,(서원비에스티) 이페 제제목 사이,,M²,19000,WOOD,가로 * 1.05 * 세로 * 1.05 * 길이 * 300 * 단가
목재,(서원비에스티) 데크,21T,M²,90000,,1M² 당 단가
목재,(서원비에스티) 탄화목 말라스,21T,M²,67000,WOOD,
목재,말라스 데크,21T,M²,38000,,1M² 당 단가
목재,말라스 데크,30T,M²,52000,,1M² 당 단가
목재,모말라 데크,19T,M²,35000,,1M² 당 단가
목재,모말라 데크,21T,M²,40000,,1M² 당 단가
목재,모말라 데크,30T,M²,52000,,1M² 당 단가
목재,메란티바투 데크,19T,M²,3200,,1M² 당 단가
목재,부기스 데크,19T,M²,32000,,1M² 당 단가
목재,방킬라이 데크,19T,M²,40000,,1M² 당 단가
목재,방킬라이 데크,21T,M²,44000,,1M² 당 단가
목재,방킬라이 데크,25T,M²,52000,,1M² 당 단가
목재,꾸메아 데크,21T,M²,47000,,1M² 당 단가
목재,멀바우 데크,19T,M²,42000,,1M² 당 단가
목재,멀바우 데크,21T,M²,43000,,1M² 당 단가
목재,멀바우 데크,30T,M²,62000,,1M² 당 단가
목재,울린 데크,19T,M²,63000,,1M² 당 단가
목재,자토바 데크,21T,M²,60000,,1M² 당 단가
목재,꾸마루 데크,21T,M²,63000,,1M² 당 단가
목재,이페 데크,19T,M²,77000,,1M² 당 단가
목재,이페 데크,21T,M²,82000,,1M² 당 단가
목재,심깎기,,EA,2500,,
목재,타공,,EA,500,,1구 당 단가
스텐판,,4×8 2T,EA,213000,,
스텐판,,4×8 2T,M²,71100,,1M² 당 단가
스텐판,,4×8 3T,EA,320000,,
스텐판,,4×8 3T,M²,107000,,1M² 당 단가
스텐판,,4×8 5T,EA,530000,,
스텐판,,4×8 5T,M²,180000,,1M² 당 단가
스텐판,,5×10 2T,EA,350000,,
스텐판,,5×10 3T,EA,520000,,
스텐판,,5×10 5T,EA,850000,,
스텐판,STS베이스,100×100 4T,EA,3500,,
스텐판,거치대 50×30 타공홀 가공 1구,,EA,350,,
스텐판,D22.3 하켑(소),,EA,80,,
스텐판,D38.1 각도기,,EA,550,,
스텐판,D38.1 L보,,EA,1300,,
스텐판,D38.1 용접마구리,,EA,150,,
스텐판,D38.1 속마구리,,EA,300,,
스텐판,D25.4 롱L보 일반,,EA,1600,,
스텐판,D25.4 R가공,,EA,2000,,
스텐판,D25.4 각도기,,EA,300,,
아연파이프,,40×20 1.4T,EA,10000,,
아연파이프,,40×20 2T,EA,13000,,
아연파이프,,50×30 1.4T,EA,13000,,
아연파이프,,50×30 2T,EA,15000,,
아연파이프,,50×50 1.4T,EA,17000,,
아연파이프,,50×50 2T,EA,20000,,
아연파이프,,75×45 1.4T,EA,24000,,
아연파이프,,75×45 2T,EA,29000,,
아연파이프,,75×75 2T,EA,35000,,
아연파이프,,100×50 2T,EA,31000,,
아연파이프,,100×100 2T,EA,49000,,
아연파이프,,100×100 2.9T,EA,60000,,
아연파이프,,125×125 3.2T,EA,105900,,
아연파이프,,150×150 4T,EA,140000,,
페인트,우레탄(기와진회색+하도+신나),,M²,7000,,1M² 당 단가
페인트,불소수지 페인트,,M²,14000,,1M² 당 단가
페인트,분체도장 페인트,,M²,12500,,1M² 당 단가
유리,강화유리 보호필름 부착,10T,M²,10000,GLASS,가로 * 세로 * 단가 / 0.09
유리,강화유리 보호필름 부착,8T,M²,8500,GLASS,가로 * 세로 * 단가 / 0.09
유리,2중접합유리 보호필름 부착 (지붕),8.76mm,M²,13000,GLASS,가로 * 세로 * 단가 / 0.09
유리,2중접합유리 보호필름 부착 (기둥),8.76mm,M²,12500,GLASS,가로 * 세로 * 단가 / 0.09
판,갈바,4×8 1.6T,EA,70000,,
판,갈바,4×8 1.6T,M²,24000,,
판,갈바,4×8 2T,EA,90000,,
판,갈바 ,5×10 1.6T,EA,110000,,
판,갈바 ,5×10 2T,EA,140000,,
판,갈바 홈가공,1.6T,M,15000,,
판,철판,4×8 2T,EA,80000,,
판,철판,4×8 2T,M²,27000,,
판,철판,4×8 2.3T,EA,86500,,
판,철판,4×8 2.3T,M²,29000,,
판,철판,4×8 3T,EA,113000,,
판,철판,4×8 3T,M²,38000,,
판,철판,4×8 5T,EA,188000,,
판,철판,4×8 5T,M²,63000,,
판,철판,4×8 6T,EA,225600,,
판,철판,4×8 6T,M²,75500,,
판,철판,4×8 9T,EA,326000,,
판,철판,4×8 9T,M²,110000,,
판,철판,4×8 10T,EA,364000,,
판,철판,4×8 10T,M²,122000,,
판,철판,4×8 12T,EA,390000,,
판,철판,4×8 12T,M²,130000,,
판,철판,5×10 2T,EA,130000,,
판,철판,5×10 2.3T,EA,135100,,
판,철판,5×10 2.3T,M²,45000,,
판,철판,5×10 3T,EA,155000,,
판,아연판,4×8 3T,EA,118000,,
판,코르텐강판,4×8 2.3T,EA,100000,,
판,코르텐강판,4×8 3T,EA,115000,,
판,코르텐강판,4×10 2.3T,EA,125000,,
판,코르텐강판,4×10 3T,EA,165000,,
판,코르텐강판,4×10 3T,M²,55000,,
판,합판 4×8,12T,EA,30000,,
판,합판 3×6,12T,EA,16000,,
판,방수 시트,,EA,30000,,
칼라파이프,,25×25 1.4T,EA,10000,,
칼라파이프,흑,25×25 2T,EA,10000,,
칼라파이프,,30×30 1.4T,EA,11000,,
칼라파이프,,30×30 2T,EA,12000,,
칼라파이프,,20×40 1.4T,EA,11000,,
칼라파이프,,20×40 2T,EA,12000,,
칼라파이프,,40×40 1.4T,EA,12000,,
칼라파이프,,40×40 2T,EA,17000,,
칼라파이프,,30×50 1.4T,EA,12000,,
칼라파이프,,30×50 2T,EA,17000,,
칼라파이프,,60×30 2T,EA,18000,,
칼라파이프,,50×50 1.4T,EA,16000,,
칼라파이프,,50×50 2T,EA,20000,,
칼라파이프,,75×45 1.4T,EA,18000,,
칼라파이프,,75×45 2T,EA,24000,,
칼라파이프,,75×45 2.9T,EA,34000,,
칼라파이프,,75×75 2T,EA,31000,,
칼라파이프,,100×50 1.4T,EA,23000,,
칼라파이프,,100×50 2T,EA,31000,,
칼라파이프,,100×100 2T,EA,40000,,
칼라파이프,,100×100 2.3T,EA,56100,,
칼라파이프,,125×75 2T,EA,38000,,
칼라파이프,,125×125 2.9T,EA,77000,,
칼라파이프,,150×50 2T,EA,50000,,
칼라파이프,,150×50 3T,EA,70000,,
칼라파이프,,150×75 3T,EA,78000,,
칼라파이프,,150×100 3T,EA,85000,,
칼라파이프,,150×150 4T,EA,145000,,
칼라파이프,,200×100 4T,EA,150000,,
칼라파이프,흑,200×200 5.7T,EA,290000,,
칼라파이프,D21.9,2T,EA,11000,,
칼라파이프,D27.2,2.4T,EA,14000,,
칼라파이프,D48.6,1.6T,EA,18000,,
칼라파이프,D101.6,2T,EA,32000,,
칼라파이프,D139.8,2.9T,EA,60000,,
칼라파이프,D165.2,3T,EA,102000,,
칼라파이프,D10환봉,,EA,5000,,4M 당 단가
평철,,38 1T,EA,2600,,6M 당 단가
평철,,38 6T,EA,15000,,6M 당 단가
평철,,50 1T,EA,2900,,6M 당 단가
평철,,50 9T,EA,26000,,6M 당 단가
평철,,50 12T,EA,35000,,6M 당 단가
평철,,65 1T,EA,3600,,6M 당 단가
평철,,65 9T,EA,32000,,6M 당 단가
평철,스텐,40 6M 1T,EA,8000,,6M 당 단가
평철,스텐,40 6M 10T,EA,80000,,6M 당 단가
평철,스텐,50 6M 1T,EA,10000,,6M 당 단가
평철,스텐,50 6M 10T,EA,100000,,6M 당 단가
스텐레스파이프,201,12.7 5T,M,710,,1M 당 단가
스텐레스파이프,201,12.7 7T,M,950,,1M 당 단가
스텐레스파이프,201,12.7 9T,M,1150,,1M 당 단가
스텐레스파이프,201,12.7 11T,M,1380,,1M 당 단가
스텐레스파이프,201,15.8 5T,M,820,,1M 당 단가
스텐레스파이프,201,15.8 7T,M,1060,,1M 당 단가
스텐레스파이프,201,15.8 9T,M,1270,,1M 당 단가
스텐레스파이프,201,15.8 11T,M,1490,,1M 당 단가
스텐레스파이프,201,15.8 15T,M,2130,,1M 당 단가
스텐레스파이프,201,19.1 5T,M,930,,1M 당 단가
스텐레스파이프,201,19.1 7T,M,1210,,1M 당 단가
스텐레스파이프,201,19.1 9T,M,1460,,1M 당 단가
스텐레스파이프,201,19.1 11T,M,1760,,1M 당 단가
스텐레스파이프,201,19.1 15T,M,2480,,1M 당 단가
스텐레스파이프,201,22.3 5T,M,1050,,1M 당 단가
스텐레스파이프,201,22.3 7T,M,1420,,1M 당 단가
스텐레스파이프,201,22.3 9T,M,1650,,1M 당 단가
스텐레스파이프,201,22.3 11T,M,1990,,1M 당 단가
스텐레스파이프,201,22.3 15T,M,2820,,1M 당 단가
스텐레스파이프,201,22.3 20T,M,3950,,1M 당 단가
스텐레스파이프,201,25.4 5T,M,1170,,1M 당 단가
스텐레스파이프,201,25.4 7T,M,1440,,1M 당 단가
스텐레스파이프,201,25.4 9T,M,1780,,1M 당 단가
스텐레스파이프,201,25.4 11T,M,2160,,1M 당 단가
스텐레스파이프,201,25.4 15T,M,2960,,1M 당 단가
스텐레스파이프,201,25.4 20T,M,4060,,1M 당 단가
스텐레스파이프,201,31.8 7T,M,1830,,1M 당 단가
스텐레스파이프,201,31.8 9T,M,2230,,1M 당 단가
스텐레스파이프,201,31.8 11T,M,2720,,1M 당 단가
스텐레스파이프,201,31.8 15T,M,3770,,1M 당 단가
스텐레스파이프,201,31.8 20T,M,5080,,1M 당 단가
스텐레스파이프,201,38.1 7T,M,2180,,1M 당 단가
스텐레스파이프,201,38.1 9T,M,2670,,1M 당 단가
스텐레스파이프,201,38.1 11T,M,3250,,1M 당 단가
스텐레스파이프,201,38.1 15T,M,4540,,1M 당 단가
스텐레스파이프,201,38.1 20T,M,6100,,1M 당 단가
스텐레스파이프,201,50.8 7T,M,3230,,1M 당 단가
스텐레스파이프,201,50.8 9T,M,3570,,1M 당 단가
스텐레스파이프,201,50.8 11T,M,4310,,1M 당 단가
스텐레스파이프,201,50.8 15T,M,6110,,1M 당 단가
스텐레스파이프,201,50.8 20T,M,8210,,1M 당 단가
스텐레스파이프,201,63.5 9T,M,4550,,1M 당 단가
스텐레스파이프,201,63.5 11T,M,5490,,1M 당 단가
스텐레스파이프,201,63.5 15T,M,7690,,1M 당 단가
스텐레스파이프,201,63.5 20T,M,10440,,1M 당 단가
스텐레스파이프,201,76.3 9T,M,5450,,1M 당 단가
스텐레스파이프,201,76.3 11T,M,6620,,1M 당 단가
스텐레스파이프,201,76.3 15T,M,9310,,1M 당 단가
스텐레스파이프,201,76.3 20T,M,12590,,1M 당 단가
스텐레스파이프,201,89.1 11T,M,7880,,1M 당 단가
스텐레스파이프,201,89.1 15T,M,11360,,1M 당 단가
스텐레스파이프,201,89.1 20T,M,15720,,1M 당 단가
스텐레스파이프,201,96 11T,M,8500,,1M 당 단가
스텐레스파이프,201,96 15T,M,12160,,1M 당 단가
스텐레스파이프,201,96 20T,M,16750,,1M 당 단가
스텐레스파이프,201,101.6 11T,M,8900,,1M 당 단가
스텐레스파이프,201,101.6 15T,M,12530,,1M 당 단가
스텐레스파이프,201,101.6 20T,M,17330,,1M 당 단가
스텐레스파이프,201,127 11T,M,11600,,1M 당 단가
스텐레스파이프,201,127 15T,M,16290,,1M 당 단가
스텐레스파이프,201,127 20T,M,21990,,1M 당 단가
스텐레스파이프,201,152.4 11T,M,14550,,1M 당 단가
스텐레스파이프,201,152.4 15T,M,20060,,1M 당 단가
스텐레스파이프,201,152.4 20T,M,27070,,1M 당 단가
스텐레스파이프,201,165.2 15T,M,22350,,1M 당 단가
스텐레스파이프,201,165.2 20T,M,29670,,1M 당 단가
스텐레스파이프,201,216.3 15T,M,32490,,1M 당 단가
스텐레스파이프,201,216.3 20T,M,41000,,1M 당 단가
스텐레스파이프,201,216.3 30T,M,60820,,1M 당 단가
스텐레스파이프,304,9.6 5T,M,860,,1M 당 단가
스텐레스파이프,304,9.6 7T,M,1100,,1M 당 단가
스텐레스파이프,304,9.6 9T,M,1340,,1M 당 단가
스텐레스파이프,304,9.6 11T,M,1570,,1M 당 단가
스텐레스파이프,304,12.7 5T,M,980,,1M 당 단가
스텐레스파이프,304,12.7 7T,M,1280,,1M 당 단가
스텐레스파이프,304,12.7 9T,M,1560,,1M 당 단가
스텐레스파이프,304,12.7 11T,M,1820,,1M 당 단가
스텐레스파이프,304,12.7 15T,M,2510,,1M 당 단가
스텐레스파이프,304,15.8 5T,M,1160,,1M 당 단가
스텐레스파이프,304,15.8 7T,M,1500,,1M 당 단가
스텐레스파이프,304,15.8 9T,M,1880,,1M 당 단가
스텐레스파이프,304,15.8 11T,M,2160,,1M 당 단가
스텐레스파이프,304,15.8 15T,M,2860,,1M 당 단가
스텐레스파이프,304,15.8 20T,M,4300,,1M 당 단가
스텐레스파이프,304,19.1 5T,M,1370,,1M 당 단가
스텐레스파이프,304,19.1 7T,M,1750,,1M 당 단가
스텐레스파이프,304,19.1 9T,M,2190,,1M 당 단가
스텐레스파이프,304,19.1 11T,M,2590,,1M 당 단가
스텐레스파이프,304,19.1 15T,M,3450,,1M 당 단가
스텐레스파이프,304,19.1 20T,M,4560,,1M 당 단가
스텐레스파이프,304,22.3 5T,M,1520,,1M 당 단가
스텐레스파이프,304,22.3 7T,M,2080,,1M 당 단가
스텐레스파이프,304,22.3 9T,M,2440,,1M 당 단가
스텐레스파이프,304,22.3 11T,M,2860,,1M 당 단가
스텐레스파이프,304,22.3 15T,M,3820,,1M 당 단가
스텐레스파이프,304,22.3 20T,M,5180,,1M 당 단가
스텐레스파이프,304,25.4 5T,M,1690,,1M 당 단가
스텐레스파이프,304,25.4 7T,M,2170,,1M 당 단가
스텐레스파이프,304,25.4 9T,M,2690,,1M 당 단가
스텐레스파이프,304,25.4 11T,M,3180,,1M 당 단가
스텐레스파이프,304,25.4 15T,M,4220,,1M 당 단가
스텐레스파이프,304,25.4 20T,M,5550,,1M 당 단가
스텐레스파이프,304,27.2 5T,M,1820,,1M 당 단가
스텐레스파이프,304,27.2 7T,M,2470,,1M 당 단가
스텐레스파이프,304,27.2 9T,M,2960,,1M 당 단가
스텐레스파이프,304,27.2 11T,M,3470,,1M 당 단가
스텐레스파이프,304,27.2 15T,M,4610,,1M 당 단가
스텐레스파이프,304,27.2 20T,M,6020,,1M 당 단가
스텐레스파이프,304,31.8 5T,M,2130,,1M 당 단가
스텐레스파이프,304,31.8 7T,M,2900,,1M 당 단가
스텐레스파이프,304,31.8 9T,M,3380,,1M 당 단가
스텐레스파이프,304,31.8 11T,M,4010,,1M 당 단가
스텐레스파이프,304,31.8 15T,M,5350,,1M 당 단가
스텐레스파이프,304,31.8 20T,M,6960,,1M 당 단가
스텐레스파이프,304,34 7T,M,3110,,1M 당 단가
스텐레스파이프,304,34 9T,M,3840,,1M 당 단가
스텐레스파이프,304,34 11T,M,4350,,1M 당 단가
스텐레스파이프,304,34 15T,M,5860,,1M 당 단가
스텐레스파이프,304,34 20T,M,7680,,1M 당 단가
스텐레스파이프,304,38.1 7T,M,3290,,1M 당 단가
스텐레스파이프,304,38.1 9T,M,4060,,1M 당 단가
스텐레스파이프,304,38.1 11T,M,4800,,1M 당 단가
스텐레스파이프,304,38.1 15T,M,6440,,1M 당 단가
스텐레스파이프,304,38.1 20T,M,8420,,1M 당 단가
스텐레스파이프,304,42.7 7T,M,3920,,1M 당 단가
스텐레스파이프,304,42.7 9T,M,4740,,1M 당 단가
스텐레스파이프,304,42.7 11T,M,5500,,1M 당 단가
스텐레스파이프,304,42.7 15T,M,7430,,1M 당 단가
스텐레스파이프,304,42.7 20T,M,9730,,1M 당 단가
스텐레스파이프,304,45 7T,M,4130,,1M 당 단가
스텐레스파이프,304,45 9T,M,5120,,1M 당 단가
스텐레스파이프,304,45 11T,M,6090,,1M 당 단가
스텐레스파이프,304,45 15T,M,8230,,1M 당 단가
스텐레스파이프,304,45 20T,M,10840,,1M 당 단가
스텐레스파이프,304,48.6 7T,M,4470,,1M 당 단가
스텐레스파이프,304,48.6 9T,M,5340,,1M 당 단가
스텐레스파이프,304,48.6 11T,M,6320,,1M 당 단가
스텐레스파이프,304,48.6 15T,M,8440,,1M 당 단가
스텐레스파이프,304,48.6 20T,M,11070,,1M 당 단가
스텐레스파이프,304,50.8 7T,M,4670,,1M 당 단가
스텐레스파이프,304,50.8 9T,M,5440,,1M 당 단가
스텐레스파이프,304,50.8 11T,M,6410,,1M 당 단가
스텐레스파이프,304,50.8 15T,M,8680,,1M 당 단가
스텐레스파이프,304,50.8 20T,M,11360,,1M 당 단가
스텐레스파이프,304,50.8 30T,M,17300,,1M 당 단가
스텐레스파이프,304,60.5 9T,M,6720,,1M 당 단가
스텐레스파이프,304,60.5 11T,M,7900,,1M 당 단가
스텐레스파이프,304,60.5 15T,M,10650,,1M 당 단가
스텐레스파이프,304,60.5 20T,M,13990,,1M 당 단가
스텐레스파이프,304,60.5 30T,M,21450,,1M 당 단가
스텐레스파이프,304,63.5 9T,M,7010,,1M 당 단가
스텐레스파이프,304,63.5 11T,M,8140,,1M 당 단가
스텐레스파이프,304,63.5 15T,M,10910,,1M 당 단가
스텐레스파이프,304,63.5 20T,M,14370,,1M 당 단가
스텐레스파이프,304,63.5 30T,M,22130,,1M 당 단가
스텐레스파이프,304,76.3 9T,M,8440,,1M 당 단가
스텐레스파이프,304,76.3 11T,M,9800,,1M 당 단가
스텐레스파이프,304,76.3 15T,M,13220,,1M 당 단가
스텐레스파이프,304,76.3 20T,M,17390,,1M 당 단가
스텐레스파이프,304,76.3 30T,M,26820,,1M 당 단가
스텐레스파이프,304,89.1 9T,M,9940,,1M 당 단가
스텐레스파이프,304,89.1 11T,M,11620,,1M 당 단가
스텐레스파이프,304,89.1 15T,M,15920,,1M 당 단가
스텐레스파이프,304,89.1 20T,M,21230,,1M 당 단가
스텐레스파이프,304,89.1 30T,M,31770,,1M 당 단가
스텐레스파이프,304,96 9T,M,10720,,1M 당 단가
스텐레스파이프,304,96 11T,M,12520,,1M 당 단가
스텐레스파이프,304,96 15T,M,17160,,1M 당 단가
스텐레스파이프,304,96 20T,M,22920,,1M 당 단가
스텐레스파이프,304,96 30T,M,34260,,1M 당 단가
스텐레스파이프,304,101.6 9T,M,11270,,1M 당 단가
스텐레스파이프,304,101.6 11T,M,13140,,1M 당 단가
스텐레스파이프,304,101.6 15T,M,17740,,1M 당 단가
스텐레스파이프,304,101.6 20T,M,23630,,1M 당 단가
스텐레스파이프,304,101.6 30T,M,36030,,1M 당 단가
스텐레스파이프,304,114.3 11T,M,16220,,1M 당 단가
스텐레스파이프,304,114.3 15T,M,20740,,1M 당 단가
스텐레스파이프,304,114.3 20T,M,26840,,1M 당 단가
스텐레스파이프,304,114.3 30T,M,40900,,1M 당 단가
스텐레스파이프,304,127 11T,M,16780,,1M 당 단가
스텐레스파이프,304,127 15T,M,22700,,1M 당 단가
스텐레스파이프,304,127 20T,M,29750,,1M 당 단가
스텐레스파이프,304,127 30T,M,45080,,1M 당 단가
스텐레스파이프,304,139.8 11T,M,19870,,1M 당 단가
스텐레스파이프,304,139.8 15T,M,27030,,1M 당 단가
스텐레스파이프,304,139.8 20T,M,34220,,1M 당 단가
스텐레스파이프,304,139.8 30T,M,50910,,1M 당 단가
스텐레스파이프,304,152.4 11T,M,20700,,1M 당 단가
스텐레스파이프,304,152.4 15T,M,27740,,1M 당 단가
스텐레스파이프,304,152.4 20T,M,36460,,1M 당 단가
스텐레스파이프,304,152.4 30T,M,54740,,1M 당 단가
스텐레스파이프,304,165.2 15T,M,31300,,1M 당 단가
스텐레스파이프,304,165.2 20T,M,39810,,1M 당 단가
스텐레스파이프,304,165.2 30T,M,59550,,1M 당 단가
스텐레스파이프,304,216.3 15T,M,44700,,1M 당 단가
스텐레스파이프,304,216.3 20T,M,53830,,1M 당 단가
스텐레스파이프,304,216.3 30T,M,78510,,1M 당 단가
폴리카보네이트,단판,3T,M²,20520,POLY,가로 * 세로 * 단가
폴리카보네이트,단판,4.5T,M²,30780,POLY,가로 * 세로 * 단가
폴리카보네이트,단판,5T,M²,34200,POLY,가로 * 세로 * 단가
폴리카보네이트,(에스폴리텍) 복층,10T,M²,17500,POLY,가로 * 세로 * 단가
폴리카보네이트,(아이에스옵틱스) 복층,10T,M²,16500,POLY,가로 * 세로 * 단가
폴리카보네이트,덮개바,,EA,12000,,
HPL,,5T,EA,165000,,
HPL,,6T,EA,188000,,
HPL,,8T,EA,234000,,
HPL,,10T,EA,280000,,
`;

let dbData = [];

// 상태 변수: 현재 선택된 자재의 특수 타입 및 기준 단가 저장
let currentItemType = "";
let currentBasePrice = 0;

function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    for(let i=1; i<lines.length; i++) {
        const row = lines[i].split(',');
        if(row.length < 5) continue;
        dbData.push({
            kind: row[0] || "",
            detail: row[1] || "",
            spec: row[2] || "",
            unit: row[3] || "",
            price: parseInt(row[4]) || 0,
            type: row[5] || "", // [요구사항 반영] 타입 컬럼 파싱
            note: row[6] || ""
        });
    }
}
parseCSV(rawCsvData);

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
        finalPrice = w * h * 330.75 * currentBasePrice;
    } else if (currentItemType === 'GLASS') {
        // [요구사항 2] 가로 * 세로 * 단가 / 0.09
        finalPrice = (w * h * currentBasePrice) / 0.09;
    } else if (currentItemType === 'POLY') {
        // [요구사항 3] 가로 * 세로 * 단가
        finalPrice = w * h * currentBasePrice;
    }

    document.getElementById('s_price').value = Math.round(finalPrice);
}