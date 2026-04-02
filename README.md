Live Demo on Vercel
https://my-movie-app-sage.vercel.app/?page=5&tab=search
Приложение для поиска фильмов, построенное на Next.js 15 (App Router) и Ant Design. 
Установка и запуск
Клонируйте репозиторий:
git clone https://github.com/nastyal12/my-movie-app.git
cd my-movie-app

Настройте переменные окружения:
Создайте файл .env.local в корневой директории и добавьте необходимые ключи (пример заполнения доступен в файле .env.example):
NEXT_PUBLIC_TMDB_API_KEY=ваш_ключ
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3

Установите зависимости и запустите проект:
npm install
npm run dev