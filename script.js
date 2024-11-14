const translations = {
  en: {
    title: "Password Tester",
    placeholder: "Enter your password",
    checkButton: "Check Strength",
    suggestions: {
      length: "Password should be at least 8 characters long.",
      uppercase: "Include at least one uppercase letter.",
      lowercase: "Include at least one lowercase letter.",
      digit: "Include at least one digit.",
      specialChar: "Include at least one special character (@, $, !, %, *, ?, &, #)."
    },
    strength: {
      weak: "Weak",
      moderate: "Moderate",
      strong: "Strong"
    },
    langSwitcher: "UA"
  },
  uk: {
    title: "Тестувальник Паролів",
    placeholder: "Введіть ваш пароль",
    checkButton: "Перевірити Силу",
    suggestions: {
      length: "Пароль має бути не менше 8 символів.",
      uppercase: "Додайте одну велику літеру.",
      lowercase: "Додайте одну малу літеру.",
      digit: "Додайте одну цифру.",
      specialChar: "Додайте один спеціальний символ (@, $, !, %, *, ?, &, #)."
    },
    strength: {
      weak: "Слабкий",
      moderate: "Середній",
      strong: "Сильний"
    },
    langSwitcher: "UK"
  }
};

let currentLanguage = 'en';

function switchLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'uk' : 'en';
  const lang = translations[currentLanguage];

  // Оновлення тексту інтерфейсу
  document.getElementById('title').textContent = lang.title;
  document.getElementById('password').placeholder = lang.placeholder;
  document.querySelector('button[onclick="checkPassword()"]').textContent = lang.checkButton;
  document.getElementById('lang-switcher').textContent = lang.langSwitcher;

  // Перевірка пароля ще раз для оновлення рекомендацій
  checkPassword();
}

function checkPassword() {
  const password = document.getElementById('password').value;
  const result = document.getElementById('result');
  const suggestions = document.getElementById('suggestions');

  if (!password) {
    result.textContent = '';
    suggestions.innerHTML = '';
    return;
  }

  let strength = 0;
  suggestions.innerHTML = '';

  const lang = translations[currentLanguage].suggestions;

  // Врахування будь-яких букв, незалежно від мови
const hasLowercase = /[a-z\u00E0-\u00FFа-яіїєґё]/; // Тільки малі літери
// Перевірка наявності великих літер
const hasUppercase = /[A-Z\u00C0-\u00DFА-ЯІЇЄҐЁ]/; // Тільки великі літери


  if (password.length >= 8) strength++;
  else suggestions.innerHTML += `<p>${lang.length}</p>`;

  if (hasUppercase.test(password)) strength++;
  else suggestions.innerHTML += `<p>${lang.uppercase}</p>`;

  if (hasLowercase.test(password)) strength++;
  else suggestions.innerHTML += `<p>${lang.lowercase}</p>`;

  if (/[0-9]/.test(password)) strength++;
  else suggestions.innerHTML += `<p>${lang.digit}</p>`;

  if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) strength++;
    
  else suggestions.innerHTML += `<p>${lang.specialChar}</p>`;

  const strengthText = translations[currentLanguage].strength;

  switch (strength) {
    case 0:
    case 1:
      result.textContent = strengthText.weak;
      result.style.color = 'red';
      break;
    case 2:
    case 3:
      result.textContent = strengthText.moderate;
      result.style.color = 'orange';
      break;
    case 4:
    case 5:
      result.textContent = strengthText.strong;
      result.style.color = 'green';
      break;
  }
}
