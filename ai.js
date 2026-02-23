function predict() {

    const hk1 = Number(document.getElementById("hk1").value);
    const target = Number(document.getElementById("target").value);

    const neededHK2 = (target*3 - hk1)/2;

    document.getElementById("predictResult").innerText =
        "Cần HK II ≈ " + neededHK2.toFixed(2);
}

function generateComment(score) {
    if(score >= 9) return "Xuất sắc 🌟";
    if(score >= 8) return "Rất tốt 👍";
    if(score >= 6.5) return "Khá ổn 📘";
    if(score >= 5) return "Cần cố gắng ⚠️";
    return "Nguy cơ thấp ❌";
}
