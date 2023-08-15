muhimlik: 5

---

# Kengaytiriladigan kalkulyator yaratish

“Uzaytiriladigan” kalkulyator obyektlarini yaratuvchi `Kalkulyator` konstruktor funksiyasini yarating.

Vazifa ikki qismdan iborat.

1. Birinchidan, `"1 + 2"` kabi qatorni "NUMBER operator NUMBER" (bo'sh joy bilan ajratilgan) formatida oladigan va natijani qaytaradigan `calculate(str)` metodini qo'llang. Plyus `+` va minus `-` ni tushunish kerak.

   Foydalanish misoli:

   ```js
   let calc = new Calculator();

   alert(calc.calculate("3 + 7")); // 10
   ```

2. Keyin kalkulyatorga yangi amalni o'rgatuvchi `addMethod(name, func)` usulini qo'shing. U `name` operatorini va uni amalga oshiradigan ikki argumentli `func(a,b)` funksiyasini oladi.

   Masalan, `*` ko'paytirish, bo'lish `/` va quvvat `**` qo`shamiz:

   ```js
   let powerCalc = new Calculator();
   powerCalc.addMethod("*", (a, b) => a * b);
   powerCalc.addMethod("/", (a, b) => a / b);
   powerCalc.addMethod("**", (a, b) => a ** b);

   let result = powerCalc.calculate("2 ** 3");
   alert(result); // 8
   ```

- Bu topshiriqda qavs yoki murakkab iboralar mavjud emas.
- Raqamlar va operator aniq bir bo'sh joy bilan ajratilgan.
- Agar siz uni qo'shmoqchi bo'lsangiz, xatolik yuz berishi mumkin.
