//Переменная для включения/отключения индикатора загрузки
var spinner = document.querySelector('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init() {
  if (localStorage.city === 'kzn') {
    var myMapTemp = new ymaps.Map('map-yandex', {
      center: [55.742012, 49.163464], // координаты центра на карте
      zoom: 11, // коэффициент приближения карты
      controls: ['zoomControl', 'fullscreenControl'], // выбираем только те функции, которые необходимы при использовании
    });

    var myPlacemarkTemp = new ymaps.Placemark(
      [55.689461, 49.160187],
      {
        balloonContent: 'Казань, коттеджный посёлок Казанская Усадьба, ул. Ризаэтдина Фахретдина, д. 19',
        iconCaption: 'Выставка компании ТопДом',
      },
      {
        preset: 'islands#blueHomeIcon',
        iconColor: '#0abc22'
      },
    );
    myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp.layers.get(0).get(0);

  // Решение по callback-у для определения полной загрузки карты
  waitForTilesLoad(layer).then(function () {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.classList.remove('is-active');
  });
  } else if (localStorage.city === 'spb') {
    var myMapTemp = new ymaps.Map('map-yandex', {
      center: [59.908642, 30.322040], // координаты центра на карте
      zoom: 15, // коэффициент приближения карты
      controls: ['zoomControl', 'fullscreenControl'], // выбираем только те функции, которые необходимы при использовании
    });
    var myPlacemarkTemp = new ymaps.Placemark(
      [59.908642, 30.322040],
      {
        balloonContent: 'Набережная Обводного канала 92 лит А',
        iconCaption: 'БЦ Обводный, Офис 101-8, 9',
      },
      {
        preset: 'islands#blueHomeIcon',
        iconColor: '#0abc22'
      },
    );
    myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp.layers.get(0).get(0);

  // Решение по callback-у для определения полной загрузки карты
  waitForTilesLoad(layer).then(function () {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.classList.remove('is-active');
  });
  } else {
    var myMapTemp = new ymaps.Map('map-yandex', {
      center: [55.883244, 37.945247], // координаты центра на карте
      zoom: 8, // коэффициент приближения карты
      controls: ['zoomControl', 'fullscreenControl'], // выбираем только те функции, которые необходимы при использовании
    });
    var myPlacemarkTemp = new ymaps.Placemark(
      [55.749633, 37.537434],
      {
        balloonContent: 'Пресненская набережная, 12',
        iconCaption: 'Московский офис компании ТопДом',
      },
      {
        iconColor: '#0abc22',
        preset: 'islands#blueHomeIcon'
      },
    );
    myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

    var myPlacemarkTemp2 = new ymaps.Placemark(
      [55.653877, 37.850496],
      {
        balloonContent: 'Дзержинское шоссе, вл7/7, Котельники',
        iconCaption: 'Выставка домов "Малоэтажная страна"',
      },
      {
        iconColor: '#0abc22'
      },
    );
    myMapTemp.geoObjects.add(myPlacemarkTemp2); // помещаем флажок на карту

    var myPlacemarkTemp3 = new ymaps.Placemark(
      [56.080859, 38.241443],
      {
        balloonContent: 'Наш коттеджный посёлок',
        iconCaption: 'Посёлок Наследие',
      },
      {
        iconColor: '#0abc22'
      },
    );
    myMapTemp.geoObjects.add(myPlacemarkTemp3); // помещаем флажок на карту

    var myPlacemarkTemp4 = new ymaps.Placemark(
      [55.938827, 36.580213],
      {
        balloonContent: 'Коттеджный посёлок Рига лайф, городской округ Истра, Московская область',
        iconCaption: 'Посёлок Riga Life',
      },
      {
        iconColor: '#0abc22'
      },
    );
    myMapTemp.geoObjects.add(myPlacemarkTemp4); // помещаем флажок на карту

    var myPlacemarkTemp5 = new ymaps.Placemark(
      [55.983936, 36.764861],
      {
        balloonContent: 'Коттеджный посёлок Forest Club, городской округ Истра, деревня Алексино',
        iconCaption: 'Посёлок Алексино Forest Club',
      },
      {
        iconColor: '#0abc22'
      },
    );
    myMapTemp.geoObjects.add(myPlacemarkTemp5); // помещаем флажок на карту

    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp.layers.get(0).get(0);

  // Решение по callback-у для определения полной загрузки карты
  waitForTilesLoad(layer).then(function () {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.classList.remove('is-active');
  });
  }


}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer),
      readyAll = true;
    for (let i = 0, len = tc.tiles.length; i < len; i++) {
      if (!tc.tiles[i].isReady()) {
        readyAll = false;
      }
    }
    if (readyAll) {
      resolve();
    } else {
      tc.events.once('ready', function () {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
        layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback) {
  var script = document.createElement('script');

  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Другие браузеры
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function () {
  document.querySelector('.ymap-container').addEventListener('mouseenter', function () {
    if (!check_if_load) {
      // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

      // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
      check_if_load = true;

      // Показываем индикатор загрузки до тех пор, пока карта не загрузится
      spinner.classList.add('is-active');

      document.querySelector(".ymap-container").classList.remove("back");

      // Загружаем API Яндекс.Карт
      loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1', function () {
        // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
        ymaps.load(init);
      });
    }
  });
};

//Запускаем основную функцию
ymap();