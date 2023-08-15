

1. Yoki o'rash funktsiyasidan foydalaning, qisqacha bo'lish uchun arrow:

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    Endi u tashqi o'zgaruvchilardan `user` ni oladi va uni odatdagi tarzda boshqaradi.

2. Yoki kontekst sifatida `user` dan foydalanadigan va birinchi argumenti true bo‘lgan `user.login` dan qisman funksiya yarating:


    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
