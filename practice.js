function generateExam() {

    const text = document.getElementById("practiceText").value;
    if(!text.trim()) return alert("Chưa nhập nội dung");

    const sentences = text.split(".").slice(0,5);

    examText = "ĐỀ ÔN TẬP\n\n";
    sentences.forEach((s,i)=>{
        examText += `Câu ${i+1}: ${s.trim()}?\n`;
    });

    document.getElementById("exam").innerText = examText;
}

function downloadExam() {
    const blob = new Blob([examText], {type:"text/plain"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "de-on-tap.txt";
    a.click();
}
