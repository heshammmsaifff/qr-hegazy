// السنة الحالية في التذييل
document.getElementById('year').textContent = new Date().getFullYear();

// ردّ فعل لمسي بسيط عند الضغط على الأزرار (لو الجهاز بيدعم)
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(10);
  });
});
