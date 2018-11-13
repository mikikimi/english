$(document).ready(function() {

  const orgList = $('li');
  let curSpeed = 1.0;
  let curPlaying = -1;
  let audioArr = $('audio');

  $('#btnCloseControl').on('click', function() {
    $('.control-inner').toggle();
    $('#toEleForm').toggle();
  });

  if ($('body').hasClass('ielts')) {
    $.each($('[data-wd-val]'), function() {
      let value = $(this).text();
      let newVal = value + ' ' + value + ' ' + value;
      $(this).text(newVal);
    });
  }

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

  $('#btnIncrease').on('click', function() {
    if (curSpeed >= 1.5) return;
    curSpeed += 0.1;
    $('#curSpeed').attr('data-value', curSpeed.toFixed(1));
    $.each($('audio'), function() {
      this.playbackRate = curSpeed;
    });
    if (curPlaying) {
      calcPlayTime(audioArr[curPlaying]);
    }
  });
  $('#btnDecrease').on('click', function() {
    if (curSpeed <= 0.6) return;
    curSpeed -= 0.1;
    $('#curSpeed').attr('data-value', curSpeed.toFixed(1));
    $.each($('audio'), function() {
      this.playbackRate = curSpeed;
    });
    if (curPlaying) {
      calcPlayTime(audioArr[curPlaying]);
    }
  });

  function sec2time(timeInSeconds) {
    let sec_num = parseInt(timeInSeconds, 10); // don't forget the second param
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    let hourSeparator = ':';
    let minuteSeparator = ':';

    if (hours == 0) {
      hours = '';
      hourSeparator = '';
    }
    if (minutes < 10 && hours != 0) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + hourSeparator + minutes + minuteSeparator + seconds;
  }

  function calcPlayTime(ele) {
    if (!ele || !ele.duration) return;
    $('#playtime').attr('data-value', sec2time(ele.duration / curSpeed));
  }

  // $(audioArr[0]).on('play', function() {
  //   $('#playPauseAudio').addClass('playing');
  //   curPlaying = 0;
  //   calcPlayTime(audioArr[0]);
  // });
  // $(audioArr[1]).on('play', function() {
  //   curPlaying = 1;
  //   $('#playPauseAudio').addClass('playing');
  //   calcPlayTime(audioArr[1]);

  // });
  // $(audioArr[0]).on('pause', function() {
  //   $('#playPauseAudio').removeClass('playing');
  // });
  // $(audioArr[1]).on('pause', function() {
  //   $('#playPauseAudio').removeClass('playing');
  // });
  // $(audioArr[0]).on('pause', function() {
  //   $('#playPauseAudio').removeClass('playing');
  // });
  // $(audioArr[0]).on('canplay', function() {
  //   calcPlayTime(audioArr[0]);
  // });
  // $(audioArr[1]).on('canplay', function() {
  //   calcPlayTime(audioArr[1]);
  // });

  $.each(audioArr, function(index) {
    let $this = $(this);
    $this.on('play', function() {
      $('#playPauseAudio').addClass('playing');
      curPlaying = 0;
      calcPlayTime(audioArr[0]);
    });
    $this.on('pause', function() {
      $('#playPauseAudio').removeClass('playing');
    });
    $this.on('canplay', function() {
      calcPlayTime(audioArr[0]);
    });

    $this.on('loadedmetadata', function() {
       $this.parent().addClass('loading');
    });

    $this.on('stalled', function() {
       $this.parent().addClass('error');
    });

    $this.on('loadeddata', function() {
       $this.parent().removeClass('loading');
    });
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