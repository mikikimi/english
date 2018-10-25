$(document).ready(function() {

  const orgList = $('li');

  if ($(window).width() >= 1240) {
    $('.audio-block').remove();
  }

  $('#btnCloseControl').on('click', function() {
    $('.control-inner').toggle();
    $('#toEleForm').toggle();
  });

  $('#hideAllWords').on('change', function() {
    $('#showAll').click();
    if ($(this).is(':checked')) {
      $('#hideWord').click();
      $('#hideDef').click();
      $('#controlsForm :input, #dublicateForm :input').prop('disabled', true);
      $.each($('li'), function() {
        let wdText = $(this).find('[data-wd-val]').data('wd-val');

        wdText = wdText.slice(0, -2);
        let rex = new RegExp(wdText, 'i');

        $(this).find('[data-sen-val]').html($(this).find('[data-sen-val]').html().replace(rex, '<strong class="wdText is-hidden" style="color: transparent;"><span>' + wdText + '</span></strong>'));
        $(this).find('[data-sen-val]').on('mouseover', function() {
          $(this).find('.wdText').css('color', '').removeClass('is-hidden');
        });
      });
    } else {
      $('#controlsForm :input, #dublicateForm :input').prop('disabled', false);
      $('#hideSen').click();
      $('#hideDef').click();
      $('#showAll').click();
    }
  });

  $('input:radio[name=hideStuff]').on("change", function(e) {
    let stt = $('input:radio[name=hideStuff]:checked').val();
    $('input:radio[name=hideStuff]').prop('disabled', true);

    switch (stt) {
      case 'hideSen':
        $.each($('li'), function() {
          let senEl = $(this).find('[data-sen-val]');
          let wdEl = $(this).find('[data-wd-val]');
          let imgEl = $(this).find('img');

          senEl.data('sen-val', $(senEl[0]).text());
          senEl.text('');
          if (wdEl.data('wd-val')) {
            wdEl.text($(wdEl[0]).data('wd-val'));
          }
          if (imgEl.data('src')) {
            imgEl.src(imgEl.data('src'));
          }
        });
        break;

      case 'hideWord':
        $.each($('li'), function() {
          let senEl = $(this).find('[data-sen-val]');
          let wdEl = $(this).find('[data-wd-val]');
          let imgEl = $(this).find('img');

          wdEl.data('wd-val', $(wdEl[0]).text());
          wdEl.text('');
          if (senEl.data('sen-val')) {
            senEl.text($(senEl[0]).data('sen-val'));
          }
          if (imgEl.data('src')) {
            imgEl.src(imgEl.data('src'));
          }
        });
        break;

      case 'hideImg':
        $.each($('li'), function() {
          let senEl = $(this).find('[data-sen-val]');
          let wdEl = $(this).find('[data-wd-val]');
          let imgEl = $(this).find('img');

          imgEl.data('src', imgEl.attr('src'));
          imgEl.attr('src', '');
          if (senEl.data('sen-val')) {
            senEl.text($(senEl[0]).data('sen-val'));
          }
          if (wdEl.data('wd-val')) {
            wdEl.text($(wdEl[0]).data('wd-val'));
          }
        });
        break;

      case 'hideAll':
        $.each($('li'), function() {
          let senEl = $(this).find('[data-sen-val]');
          let wdEl = $(this).find('[data-wd-val]');

          if (senEl.text()) {
            senEl.data('sen-val', $(senEl[0]).text());
            senEl.text('');
          }

          if (wdEl.text()) {
            wdEl.data('wd-val', $(wdEl[0]).text());
            wdEl.text('');
          }
        });
        break;

      case 'showAll':
        $.each($('li'), function() {
          let senEl = $(this).find('[data-sen-val]');
          let wdEl = $(this).find('[data-wd-val]');
          let imgEl = $(this).find('img');

          if (wdEl.data('wd-val')) {
            wdEl.text($(wdEl[0]).data('wd-val'));
          }
          if (senEl.data('sen-val')) {
            senEl.text($(senEl[0]).data('sen-val'));
          }
          if (imgEl.data('src')) {
            imgEl.attr('src', imgEl.data('src'));
          }
        });
        break;

      default:
        break;
    }

    $('input:radio[name=hideStuff]').prop('disabled', false);
  });
  $('#hideDef').on("change", function() {
    if ($(this).is(':checked')) {
      $('[data-def]').addClass('d-none');
    } else {
      $('[data-def]').removeClass('d-none');
    }
  });

  $('#btnDublicate').on("click", function() {
    var num = $('#dublicateSens').val() | 0;

    if (num <= 0) return;

    $.each($('[data-row]'), function() {
      let i = num;
      let self = $(this);
      let newHTML = $('<p data-dublicate>' + self.html() + '</p>');
      while (i > 0) {
        newHTML.clone().insertAfter(self);
        i--;
      }
    });
  });

  $('#btnReset').on('click', function() {
    $('[data-dublicate]').remove();
  });

  $('#toEleForm').on('submit', function(e) {
    e.preventDefault();
    let num = $('#goToEl').val();
    let el = $('li')[num - 1];
    if (el) {
      $('html,body').animate({
        scrollTop: $(el).offset().top - 30
      }, 5);
    } else {
      $('html,body').animate({
        scrollTop: $('.controls').offset().top - 30
      }, 5);
    }
  });

  $('#fadeStuff').on('change', function() {
    if ($(this).is(':checked')) {
      // $('#btnReset').click();
      $('#showAll').click();
      $('#controlsForm :input, #dublicateForm :input').prop('disabled', true);
      $.each($('li'), function() {
        let self = $(this);
        self.find('[data-row], [data-dublicate]').css('opacity', 0);
        self.on('mouseover', function() {
          self.find('[data-row], [data-dublicate]').css('opacity', '');
        });
      });
    } else {
      $('#controlsForm :input, #dublicateForm :input').prop('disabled', false);
      $.each($('li'), function() {
        $(this).find('[data-row], [data-dublicate]').css('opacity', '');
      });
    }
  });

  $('#shuffleItems').on('change', function() {
    $(this).prop('disbaled', true);
    $('#fadeStuff').prop('checked', false).trigger('change');

    if ($(this).is(':checked')) {
      let newList = document.getElementsByTagName('li');
      $('ul').html(_.shuffle(newList));
    } else {
      $('#btnReset').click();
      $('#showAll').click();
      $('ul').html('').html(orgList);
    }

    $(this).prop('disbaled', false);
  });

  let curSpeed = 1.0;

  $('#btnIncrease').on('click', function() {
    if (curSpeed >= 1.5) return;
    curSpeed += 0.1;
    $('#curSpeed').text(curSpeed.toFixed(1));
    $.each($('audio'), function() {
      this.playbackRate = curSpeed;
    });
  });
  $('#btnDecrease').on('click', function() {
    if (curSpeed <= 0.6) return;
    curSpeed -= 0.1;
    $('#curSpeed').text(curSpeed.toFixed(1));
    $.each($('audio'), function() {
      this.playbackRate = curSpeed;
    });
  });

  let curPlaying = -1;
  let audioArr = $('audio');
  $(audioArr[0]).on('play', function() {
    $('#playPauseAudio').addClass('playing');
  });
  $(audioArr[1]).on('play', function() {
    $('#playPauseAudio').addClass('playing');
  });
  $(audioArr[0]).on('pause', function() {
    $('#playPauseAudio').removeClass('playing');
  });
  $(audioArr[1]).on('pause', function() {
    $('#playPauseAudio').removeClass('playing');
  });

  $('#playPauseAudio').on('click', function() {

    let state = audioArr[0].paused && audioArr[1].paused;

    if (state) {
      if (curPlaying != -1) {
        audioArr[curPlaying].play();
      } else {
        audioArr[1].play();
        curPlaying = 1;
      }
    } else {
      if (!audioArr[0].paused && !audioArr[1].paused) {
        audioArr[0].pause();
        audioArr[1].pause();
        curPlaying = 1;
      } else if (!audioArr[0].paused) {
        audioArr[0].pause();
        curPlaying = 0;
      } else {
        audioArr[1].pause();
        curPlaying = 1;
      }
    }

    $.each($('audio'), function() {
      this.playbackRate = curSpeed;
    });
  });
  
});