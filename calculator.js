function calculate() {

    const tx = [
        tx1.value, tx2.value, tx3.value, tx4.value, tx5.value
    ].map(Number).filter(x => !isNaN(x));

    const gk = Number(document.getElementById("gk").value);
    const ck = Number(document.getElementById("ck").value);

    const txAvg = tx.reduce((a,b)=>a+b,0)/tx.length;
    const avg = ((txAvg) + gk*2 + ck*3)/6;

    document.getElementById("result").innerText =
        "Điểm TB HK: " + avg.toFixed(2);

    document.getElementById("comment").innerText =
        generateComment(avg);
}
