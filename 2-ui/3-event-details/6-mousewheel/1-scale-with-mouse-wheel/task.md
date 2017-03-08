importance: 5

---

# Масштабирование колёсиком мыши

Сделайте так, чтобы при прокрутке колёсиком мыши над элементом, он масштабировался.

Масштабирование обеспечивайте при помощи свойства CSS transform:

```js
// увеличение в 1.5 раза
elem.style.transform = elem.style.WebkitTransform = elem.style.MsTransform = 'scale(1.5)';
```

Результат в iframe:

[iframe link border="1" src="solution" height="160"]
