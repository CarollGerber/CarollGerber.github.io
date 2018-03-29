$(document).ready(function(){

  var selectedCardIndex = -1;
  var leftCardIndex = 0;
  var rightCardIndex = 1;
  var selectedChangeColumn = undefined;


  $(".change").click(function()  {
    populatePopup(cardsData);
    $('#popup').fadeIn(300);
    var iddiv = $(this).attr("iddiv");
    $('#'+iddiv).fadeIn(300);
    $('#popup').attr('opendiv',iddiv);
    var id = $(this).attr('id');
    if (id === 'changeLeft') {
      selectedChangeColumn = 'left';
    } else if (id === 'changeRight') {
      selectedChangeColumn = 'right';
    }
    return false;
  });

  $('#popup').click(function()
                                                  {
    var iddiv = $("#popup").attr('opendiv');
    $('#popup').fadeOut(300);
    $('#'+iddiv).fadeOut(300);
  });

  $('#popup, .popup_window_close_x').click(function()
                                                    {
    var iddiv = $("#popup").attr('opendiv');
    $('#popup').fadeOut(300);
    $('#'+iddiv).fadeOut(300);
  });


  $('#popup_window_close__compare').click(function () {
    if (selectedChangeColumn == 'left') {
      cardsData[leftCardIndex].comparePosition = null;
      leftCardIndex = selectedCardIndex;
    } else  if (selectedChangeColumn == 'right') {
      cardsData[rightCardIndex].comparePosition = null;
      rightCardIndex = selectedCardIndex;
    }

    var card = cardsData[selectedCardIndex];
    card.comparePosition = selectedChangeColumn;
    fillCardCollumn(card, selectedChangeColumn);

    var iddiv = $("#popup").attr('opendiv');
    $('#popup').fadeOut(300);
    $('#'+iddiv).fadeOut(300);
  });

  /**
   * Функция для заполнения столбца с информацией о карте
   * @param card - объект с данными карты
   * @param position - положение в списке: left, right
   */
  var fillCardCollumn = function (card, position) {
    if (position == 'left') {
      $('#cardTitle_left').text(card.title);
      $('#cardImage_left').attr('src', card.image);
    } else if (position == 'right') {
      $('#cardTitle_right').text(card.title);
      $('#cardImage_right').attr('src', card.image);
    }

  };

  /**
   * Функция для заполнения попапа данными
   * @param data - массив с картами
   */
  var populatePopup = function(data) {

    var cardsContainer = $("#cards_container"); //Получаем контйенр в котором будем показывать карты
    cardsContainer.empty(); //Очищаем контейнер

    for (var i = 0; i<data.length; i++) {
      var card = data[i];

      //Показываем только те карты, которые не добавлены к сравненияю
      if (card.comparePosition == null) {
        var itemId = 'compare_'+i;
        var cardTemplate = '<div class="popup_card_block clearfix" id="'+ itemId +'">' +
            '<div class="popup_card_title">'+ card.title +'</div>' +
            '<div class="popup_card_image">' +
            '<img src="'+card.image+'"></div>' +
            '<div class="popup_card_description">'+card.description+'</div> ' +
            '</div>';
        cardsContainer.append(cardTemplate);

        var clickHandler = function (element) {

          var allCards = $("#cards_container").children();
          for (var i = 0; i < allCards.length; i++) {
            $(allCards[i]).removeClass('popup_card_block__selected');
          }

          var id = $(this).attr('id');
          $('#'+id).addClass('popup_card_block__selected');
          selectedCardIndex = id.split('_')[1];
        };

        $('#'+itemId).click(clickHandler);
      }
    }
  };


//Выбор карт
  /**
   * Массив с данными о картах. Пердпологается что данные в него заносятся из базы.
   * Элементы массива - данные одной карты.
   * image - ссылка на изображение карты.
   * title - заголовок карты.
   * comparePosition - положение в блоке сравнения, null если карта не добавлена к сравнению.
   * @type {*[]}
   */
  var cardsData = [
    {
      image: './image/Compare%20Credit%20Cards_CL_ImgID34.png',
      title: 'Barclaycard Arrival Plus® World Elite Mastercard®',
      description: '',
      comparePosition: 'left'
    },
    {
      image: './image/Compare%20Credit%20Cards_CL_ImgID36.png',
      title: 'Discover it® - Cashback Match',
      description: 'Enjoy 40,000 bonus miles after you spend $3,000 on purchases in the first 90 days',
      comparePosition: 'right'
    },
    {
      image: './image/Compare%20Credit%20Cards_CL_ImgID50.png',
      title: 'First Access Visa',
      description: 'Enjoy 40,000 bonus miles after you spend $3,000 on purchases in the first 90 days',
      comparePosition: null
    },
    {
      image: './image/Compare%20Credit%20Cards_CL_ImgID32.png',
      title: 'Capital One® VentureOne® Rewards Credit Card',
      description: '50000 Miles once you spend $3,000 on purchases within 3 months from account opening',
      comparePosition: null
    },
    {
      image: './image/Compare%20Credit%20Cards_CL_ImgID12.png',
      title: 'Capital One® QuicksilverOne® Cash Rewards Credit Card',
      description: '50,000 bonus ThankYou® Points after you spend $4,000 in purchases within the first 3 months of account opening*',
      comparePosition: null
    },
    {
      image: './image/Compare%20Credit%20Cards_CL_ImgID50.png',
      title: 'First Access Visa',
      description: 'Enjoy 40,000 bonus miles after you spend $3,000 on purchases in the first 90 days',
      comparePosition: null
    },
    {
      image: './image/Compare%20Credit%20Cards_CL_ImgID12.png',
      title: 'Credit One Bank® Cash Back Rewards Credit Card',
      description: '50,000 bonus ThankYou® Points after you spend $4,000 in purchases within the first 3 months of account opening*',
      comparePosition: null
    }
  ];

  //При загрузке старницы заполняем левый и парвый столбец данными из 0-ой и 1-ой карты соответственно
  fillCardCollumn(cardsData[leftCardIndex], 'left');
  fillCardCollumn(cardsData[rightCardIndex], 'right');
});

