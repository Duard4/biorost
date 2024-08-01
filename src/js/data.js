// src/sections/data.js
import sunImage from './../assets/content-images/sun.jpg';
import placeholderImage from './../assets/content-images/logo.png';

export const items = [
    { id: 1, type: 'org', imageSrc: sunImage, title: 'Біорост Універсал', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 2, type: 'org', imageSrc: sunImage, title: 'Біорост Старт', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 3, type: 'org', imageSrc: placeholderImage, title: 'Зима', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 4, type: 'org', imageSrc: placeholderImage, title: 'Ультра Бор Азот', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 5, type: 'org', imageSrc: placeholderImage, title: 'Бор+', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 6, type: 'org', imageSrc: sunImage, title: 'Сірка+', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 7, type: 'org', imageSrc: sunImage, title: 'Цинк+', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 8, type: 'org', imageSrc: placeholderImage, title: 'Магній+', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 9, type: 'org', imageSrc: placeholderImage, title: 'Суміш для наливу', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 10, type: 'org', imageSrc: placeholderImage, title: 'Гранула "Біорост"', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 11, type: 'ino', imageSrc: placeholderImage, title: 'Сухий інокулянт', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 12, type: 'fun ins', imageSrc: placeholderImage, title: 'Гаупсин', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 13, type: 'fun', imageSrc: placeholderImage, title: 'Триходермін', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 14, type: 'fun', imageSrc: placeholderImage, title: 'Гліокладин', description: 'Lorem ddddddddddddddddddddddddddddddddddipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 12, type: 'ins', imageSrc: placeholderImage, title: 'Метаризин', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 13, type: 'ins', imageSrc: placeholderImage, title: 'Бітоксибацилін', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 14, type: 'ins', imageSrc: placeholderImage, title: 'Квартоцид', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 15, type: 'bact', imageSrc: placeholderImage, title: 'Біорост Бактерос', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 16, type: 'fito', imageSrc: placeholderImage, title: 'Біорост Ауксин', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 17, type: 'fito', imageSrc: placeholderImage, title: 'Біорост Імунітет', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' },
    { id: 19, type: 'comp', imageSrc: placeholderImage, title: 'Біорост Симбіоз-Бар-Фоліар', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum magnam reiciendis' }
];

export const types = [
    { id: 'org', name: 'Органомінеральні' },
    { id: 'ino', name: 'Інокулянти' },
    { id: 'fun', name: 'Біофунгіциди' },
    { id: 'ins', name: 'Біоінсектициди' },
    { id: 'bact', name: 'Бактерії ґрунтові' },
    { id: 'comp', name: 'Біокомплекси' },
    { id: 'fito', name: 'Фітогормони' }
];