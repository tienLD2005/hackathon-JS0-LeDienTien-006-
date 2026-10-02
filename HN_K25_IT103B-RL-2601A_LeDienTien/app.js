let currentEnrollCode = "";
let isEnrollValid = false;
let totalRevenue = 0;
let totalEnrollments = 0;
let isRunning = true;

while (isRunning) {
    const menu = 
        "=====================================================\n" +
        "HỆ THỐNG TUYỂN SINH BRIGHTWAY ENGLISH\n" +
        "=====================================================\n" +
        "1. Nhập và kiểm chuẩn mã đăng ký\n" +
        "2. Tính học phí khóa học\n" +
        "3. Thẩm định số báo danh may mắn\n" +
        "0. Thoát chương trình\n" +
        "=====================================================\n" +
        "Vui lòng nhập lựa chọn của bạn (0 - 3):";

        // nhận vào lựa chọn người dùng
    const inputChoice = prompt(menu);
    const choice = inputChoice !== null ? inputChoice.trim() : null;

    switch (choice) {
        case "1": {
            currentEnrollCode = "";
            isEnrollValid = false;

            // tiến hành validate giá trị ban đầu nhập vào thoả mãn -> tạo mã thành công, còn không thoả mã đk thì sẽ thông báo nhập lại
            const rawInput = prompt("Nhập mã đăng ký:");
            if (rawInput === null || rawInput.trim() === "") {
                console.log("Lỗi: Chưa nhập mã đăng ký");
                break;
            }
            const normalizedCode = rawInput.trim().toUpperCase();

            if (normalizedCode.length < 6) {
                console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
            } else if (!normalizedCode.startsWith("ENG-")) {
                console.log('Lỗi: Sai tiền tố "ENG-"');
            } else if (normalizedCode.includes(" ")) {
                console.log("Lỗi: Chứa khoảng trắng ở giữa");
            } else {
                currentEnrollCode = normalizedCode;
                isEnrollValid = true;
                console.log("Mã đăng ký hợp lệ: " + currentEnrollCode);
            }
            break;
        }

        case "2": {

            // check xem stt của mã đăng ký nhận vào có true ko nếu không thì thong báo
            if (!isEnrollValid) {
                console.log("Chưa có mã đăng ký hợp lệ. Vui lòng chọn chức năng 1 để thêm mã đăng ký");
                break;
            }
            
            // khởi tạo các giá trị ban đàu theo đề để tiến hành fill dữ liệu
            let courseCount = 0;
            let pricePerCourse = 0;
            let isCancelled = false;
            
            // các vòng lặp while để cho người dùng nếu sai dk theo đề bài sẽ bị bắt nhập lại liên tục cho đến khi thoả mãn dk thì sẽ sang input mới 
            while (true) {
                const inputCourses = prompt("Nhập số khóa học:");
                if (inputCourses === null) {
                    isCancelled = true;
                    break;
                }
                const trimmedCourses = inputCourses.trim();
                const countNum = Number(trimmedCourses);
                if (trimmedCourses !== "" && !isNaN(countNum) && Number.isInteger(countNum) && countNum > 0) {
                    courseCount = countNum;
                    break;
                } else {
                    console.log("Số khóa học không hợp lệ. Vui lòng nhập lại");
                }
            }
            if (isCancelled) {
                console.log("Đã hủy giao dịch tính học phí.");
                break;
            }

            // tương tự chức năng nhập số khoá học
            while (true) {
                const inputPrice = prompt("Nhập học phí mỗi khóa:");
                if (inputPrice === null) {
                    isCancelled = true;
                    break;
                }
                const trimPrice = inputPrice.trim();
                const priceNum = Number(trimPrice);
                if (trimPrice !== "" && !isNaN(priceNum) && Number.isInteger(priceNum) && priceNum > 0) {
                    pricePerCourse = priceNum;
                    break;
                } else {
                    console.log("Học phí không hợp lệ. Vui lòng nhập lại");
                }
            }
            if (isCancelled) {
                console.log("Đã hủy giao dịch tính học phí.");
                break;
            }

            // các công thức tính toán theo đề bài
            const baseCost = courseCount * pricePerCourse;
            let discount = 0;
            if (courseCount >= 4) {
                discount = Math.round(baseCost * 0.1);
            }

            const documentFee = Math.round((baseCost - discount) * 0.08);
            const totalPayment = (baseCost - discount) + documentFee;
            totalRevenue += totalPayment;
            totalEnrollments += 1;

            console.log("================ HOÁ ĐƠN ===================");
            console.log("Mã đăng ký: " + currentEnrollCode);
            console.log("Số khóa học: " + courseCount);
            console.log("Học phí mỗi khóa: " + pricePerCourse + " VNĐ");
            console.log("Chi phí cơ sở: " + baseCost + " VNĐ");
            console.log("Tiền giảm giá: " + discount + " VNĐ");
            console.log("Phí giáo trình và tài liệu: " + documentFee + " VNĐ");
            console.log("Tổng thanh toán: " + totalPayment + " VNĐ");
            console.log("=============================================");

        
            // sau khi kết thúc chức năng của mỗi case -> tiến hành làm mới dự liệu mã đăng ký
            currentEnrollCode = "";
            isEnrollValid = false;
            break;
        }
        case "3": {
            const inputStudentId = prompt("Nhập số báo danh của học viên:");

            if (inputStudentId === null){
                console.log("Đã hủy nhập số báo danh.");
                break;
            }

            // Tiến hành bắt validate số báo danh của sinh viên theo đk của đề
            const studentId = inputStudentId.trim();
            let isValidStudentId = true;
            if (studentId.length < 2) {
                isValidStudentId = false;
            } else {
                let fullZero = true;
                for (let i = 0; i < studentId.length; i++) {
                    const char = studentId[i];
                    if (char < "0" || char > "9") {
                        isValidStudentId = false;
                        break;
                    }
                    if (char !== "0") {
                        fullZero = false;
                    }
                }
                if (fullZero) {
                    isValidStudentId = false;
                }
            }

            // thông báo nếu sbđ không hợp lệ
            if (!isValidStudentId) {
                console.log("Số báo danh không hợp lệ");
                break;
            }

            // tiến hành đảo ngược sbđ để kiểm tra điều kiện sbđ đối xứng và tổng các chữ số của sbđ có chia hết cho 9 không
            let reversedId = "";
            for (let i = studentId.length - 1; i >= 0; i--) {
                reversedId += studentId[i];
            }
            const isValidString = (studentId === reversedId);
            let digitSum = 0;
            for (let i = 0; i < studentId.length; i++) {
                digitSum += Number(studentId[i]);
            }
            const isDivisibleBy9 = (digitSum % 9 === 0);
            let prize = "";
            if (isValidString && isDivisibleBy9) {
                prize = "Giải Đặc biệt";
            } else if (isValidString && !isDivisibleBy9) {
                prize = "Giải Nhất";
            } else if (!isValidString && isDivisibleBy9) {
                prize = "Giải Nhì";
            } else {
                prize = "Không trúng thưởng";
            }

            console.log("========== KẾT QUẢ SỐ BÁO DANH ==========");
            console.log("Mã số gốc: " + studentId);
            console.log("Mã đảo ngược: " + reversedId);
            console.log("Tổng chữ số: " + digitSum);
            console.log("Chia hết cho 9: " + (isDivisibleBy9 ? "Có" : "Không"));
            console.log("Kết quả: " + prize);
            console.log("==================================================");
            break;
        }
        // nhập. 0 để kết thúc vòng lặp menu 
        case "0": {
            console.log("Kết thứu chương trìnhhh!");
            isRunning = false;
            break;
        }
        // các choice không hợp lệ sẽ không thoả mãn các dk trên -> nhảy vào đấy để thông báo 
        default: {
            console.log("Lựa chọn không hợp lệ. Vui lòng nhập một số từ 0 đến 3!");
            break;
        }
    }
}
