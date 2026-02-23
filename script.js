let student = "";
let subjects = [];
let chart;

function login(){
    student = document.getElementById("studentName").value;
    if(!student) return alert("Nhập tên trước!");
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("welcome").innerText = "Xin chào, " + student;
    loadData();
}

function addSubject(){
    const tbody = document.getElementById("tableBody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input></td>
        <td><input type="number" min="0" max="10"></td>
        <td><input type="number" min="0" max="10"></td>
        <td><input type="number" min="0" max="10"></td>
        <td class="avg">0</td>
        <td class="rank">-</td>
    `;

    row.querySelectorAll("input").forEach(i=>{
        i.onchange = calculate;
    });

    tbody.appendChild(row);
}

function calculate(){
    const rows = document.querySelectorAll("#tableBody tr");
    subjects = [];

    rows.forEach(row=>{
        const inputs = row.querySelectorAll("input");
        const name = inputs[0].value;
        const tx = Number(inputs[1].value)||0;
        const gk = Number(inputs[2].value)||0;
        const ck = Number(inputs[3].value)||0;

        const avg = (tx + gk*2 + ck*3)/6;
        row.querySelector(".avg").innerText = avg.toFixed(2);

        let rank="Yếu";
        if(avg>=8) rank="Giỏi";
        else if(avg>=6.5) rank="Khá";
        else if(avg>=5) rank="Trung bình";

        row.querySelector(".rank").innerText=rank;

        subjects.push({name,avg});
    });

    updateChart();
    aiSuggest();
}

function updateChart(){
    const ctx=document.getElementById("chart");
    if(chart) chart.destroy();
    chart=new Chart(ctx,{
        type:"bar",
        data:{
            labels:subjects.map(s=>s.name),
            datasets:[{
                label:"Điểm TB",
                data:subjects.map(s=>s.avg)
            }]
        }
    });
}

function aiSuggest(){
    if(subjects.length==0) return;
    const avgAll=subjects.reduce((a,b)=>a+b.avg,0)/subjects.length;
    let msg="Bạn cần cải thiện thêm.";
    if(avgAll>=8) msg="Bạn đang ở mức Giỏi! Hãy duy trì phong độ.";
    else if(avgAll>=6.5) msg="Cố thêm 0.5 điểm mỗi môn để đạt Giỏi.";
    document.getElementById("aiSuggest").innerText=msg;
}

function saveData(){
    localStorage.setItem("baoAI_"+student,JSON.stringify(subjects));
    alert("Đã lưu!");
}

function loadData(){
    const data=localStorage.getItem("baoAI_"+student);
    if(data){
        subjects=JSON.parse(data);
    }
}

function exportCSV(){
    let csv="Mon,TB\n";
    subjects.forEach(s=>{
        csv+=`${s.name},${s.avg}\n`;
    });
    const blob=new Blob([csv],{type:"text/csv"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="diem.csv";
    a.click();
}
