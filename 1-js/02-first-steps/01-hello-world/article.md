# Salom, dunyo!

Qo'llanmaning bu qismi asosiy JavaScript, ya'ni tilning o'zi haqida.

Ammo skriptlarimizni ishga tushirish uchun bizga ish muhiti kerak va bu kitob onlayn bo'lgani uchun brauzer eng yaxshi tanlovdir. Agar diqqatingizni boshqa muhitga (masalan, Node.js) qaratmoqchi bo‘lsangiz, ularga vaqt sarflamaslik uchun brauzerga oid buyruqlar miqdorini (masalan, "alert") minimal darajada ushlab turamiz. Biz qo'llanmaning [keyingi qismi](/ui) da e'tiborimizni brauzer ichidagi JavaScriptga qaratamiz.

Shunday qilib, avval veb-sahifaga skriptni qanday biriktirishimizni ko'rib chiqamiz. Server tomonidagi muhitlar uchun (masalan, Node.js) skriptni `"node my.js"` kabi buyruq bilan bajarishingiz mumkin.


## "script" tegi

JavaScript dasturlarni HTML hujjatning deyarli istalgan joyiga `<script>` tegidan foydalanib kiritish mumkin.

Misol uchun:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Skriptdan avval...</p>

*!*
  <script>
    alert( 'Salom, dunyo!' );
  </script>
*/!*

  <p>...Skriptdan keyin.</p>

</body>

</html>
```

```online
Yuqoridagi oynaning o'ng yuqori burchagidagi "Play" tugmasini bosish orqali misolni ishga tushirishingiz mumkin.
```

`<script>` tegi brauzer tegni ishga tushirganda avtomatik ravishda bajariladigan JavaScript kodini o'z ichiga oladi.

## Zamonaviy ko'rinish

`<script>` tegining bir nechta atributlari mavjud boʻlib, ular hozirgi kunda kamdan-kam qoʻllaniladi, lekin ularni eski kodlarda uchratish mumkin:

`type` atributi: <code>&lt;script <u>type</u>=...&gt;</code>
: Eski standart HTML va HTML4 skriptlarda `type` bo'lishini talab qilgan. Odatda u `type="text/javascript"` shaklida bo'lgan. Lekin u boshqa talab qilinmaydi. Hamda, yangi HTML standarti bu atributning mazmunini butunlay o'zgartirib yubordi. Hozir, u JavaScript modullari uchun ishlatilinishi mumkin. Ammo, bu ancha murakkab mavzu, modullar haqida darslikning boshqa qismida gaplashamiz.

`language` atributi: <code>&lt;script <u>language</u>=...&gt;</code>
: Bu atributdan skriptning tilini ko'rsatish uchun foydalaniladi. Bu atribut ortiq hech qanday ma'no anglatmaydi, chunki JavaScript doimiy tildir. Uni ishlatishga endi ehtiyoj yo'q.

Skriptlardan oldin va keyingi izohlar.
: Eski kitob va qo'llanmalarda, `<script>` teglarining ichida mana bunday izohlarni topishingiz mumkin:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Zamonaniy JavaScriptda bu usuldan foydalanilmaydi. Bu izohlar `<script>` tegini qanday ishga tushirishni bilmaydigan eski brauzerlardan JavaScript kodini yashiradi. Oxirgi 15 yilda chiqarilgan brauzerlarda bunday muammo bo'lmagani sababli bunday turdagi izohlar eski kodlarni aniqlashga yordam berishi mumkin.


## Tashqi skriptlar

Agar bizda ko'p JavaScript kodi bo'lsa, ularni alohida faylga joylashimiz mumkin.


Skript fayllar HTMLga `src` artibuti yordamida bog'lanadi:

```html
<script src="/path/to/script.js"></script>
```

Bu yerda `/path/to/script.js` sayt ildizidan skriptga mutlaq yo'ldir. One can also provide a relative path from the current page. Misol uchun, `src="script.js"`, xuddi `src="./script.js"` kabi `"script.js"` fayli joriy papkada ekanligini bildiradi. 

To'liq URL manzilni ham berishimiz mumkin. Misol uchun:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

Bir nechta skriptlarni biriktirish uchun, ko'proq teglardan foydalaning:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Qoida bo'yicha, faqat eng sodda skriptlargina HTMLga joylanadi. Murakkablari esa alohida fayllarda joylashadi.

Alohida faylning foydali johati shuki, brauzer uni yuklab oladi va [cache](https://en.wikipedia.org/wiki/Web_cache)da saqlaydi.

Xuddi shu skriptga havola qilingan boshqa sahifalar uni yuklab olish o'rniga keshdan oladi, shuning uchun fayl faqatgina bir marta yuklab olinadi.

Bu trafikni kamaytiradi va sahifalarni tezroq qiladi.
```

````warn header="Agar `src` o'rnatilgan bo'lsa, skriptning mazmuni yo'qoladi."
Yakka `<script>` tegi bir vaqtda `src` atributini ham ichida kodni ham saqlolmaydi.    

Quyidagi kod ish bermaydi:

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

Biz yo tashqi `<script src="…">` ni yo oddiy kod yoziladigan `<script>` ni tanlashimiz lozim.

Yuqoridagi misolni ikkita ishlaydigan skriptga ajratish mumkin:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Xulosa

- Biz `<script>` tegidan JavaScript kodni sahifaga qo'shish uchun foydalanamiz.
- `type` va `language` atributlari talab qilinmaydi.
- Tashqi fayldagi skript `<script src="path/to/script.js"></script>` orqali kiritilishi mumkin.


Brauzer skriptlari va ularning veb-sahifa bilan o'zaro ta'siri haqida yanada ko'proq ma'lumot o'rganish mumkin. Ammo shuni yodda tutish kerakki, o'quv qo'llanmaning ushbu qismi JavaScript tiliga bag'ishlangan, shuning uchun o'zimizni uning brauzerga xos amallar bilan chalg'itmasligimiz kerak. Biz brauzerdan JavaScriptni ishga tushirish usuli sifatida foydalanamiz, bu onlayn o'qish uchun juda qulay, lekin ko'p usullardan faqat bittasi.
