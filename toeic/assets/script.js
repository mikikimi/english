$(document).ready(function() {

	const orgList = $('li');

  if ($(window).width() >= 1240) {
    $('.audio-block').remove();
  }

  $('#hideOrder').on("change", function() {
    if ($(this).is(':checked')) {
      $.each($('li'), function() {
        let orderEl = $(this).find('.number');

        orderEl.data('order', orderEl.text());
        orderEl.text('');
      });
    } else {
      $.each($('li'), function() {
        let orderEl = $(this).find('.number');

        if (orderEl.data('order')) {
          orderEl.text(orderEl.data('order'));
        }
      });
    }
  });

  $('#hideAllWords').on('change', function(){
    $('#showAll').click();
    if ($(this).is(':checked')) {
      $('#hideWord').click();      
      $('#hideDef').click();      
      $('#hideOrder').click();      
      $('#controlsForm :input, #dublicateForm :input').prop('disabled', true);
      $.each($('li'), function() {
        let wdText = $(this).find('[data-wd-val]').data('wd-val');

        wdText = wdText.slice(0, -2);
        let rex = new RegExp(wdText, 'i');

        $(this).find('[data-sen-val]').html($(this).find('[data-sen-val]').html().replace(rex, '<strong class="wdText" style="color: transparent;">' + wdText + '</strong>'));
        $(this).find('[data-sen-val]').on('mouseover', function(){
          $(this).find('.wdText').css('color', '');
        });
      });
    } else {      
      $('#controlsForm :input, #dublicateForm :input').prop('disabled', false);  
      $('#hideOrder').click();
      $('#hideSen').click();   
      $('#showAll').click();   
    }
  });

  $('#hideDef').on("change", function() {
    if ($(this).is(':checked')) {
      $.each($('li'), function() {
        let defEl = $(this).find('[data-def]');

        defEl.data('def', defEl.text());
        defEl.text('');
      });
    } else {
      $.each($('li'), function() {
        let defEl = $(this).find('[data-def]');

        if (defEl.data('def')) {
          defEl.text(defEl.data('def'));
        }
      });
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

          senEl.data('sen-val', $(senEl[0]).text());
          senEl.text('');
          if (wdEl.data('wd-val')) {
            wdEl.text($(wdEl[0]).data('wd-val'));
          }
        });
        break;

      case 'hideWord':
        $.each($('li'), function() {
          let senEl = $(this).find('[data-sen-val]');
          let wdEl = $(this).find('[data-wd-val]');

          wdEl.data('wd-val', $(wdEl[0]).text());
          wdEl.text('');
          if (senEl.data('sen-val')) {
            senEl.text($(senEl[0]).data('sen-val'));
          }
        });
        break;

      case 'hideAll':
        $.each($('li'), function() {
          let senEl = $(this).find('[data-sen-val]');
          let wdEl = $(this).find('[data-wd-val]');
          let defEl = $(this).find('.definition');

          if (senEl.text()) {
            senEl.data('sen-val', $(senEl[0]).text());
            senEl.text('');
          }

          if (wdEl.text()) {
            wdEl.data('wd-val', $(wdEl[0]).text());
            wdEl.text('');
          }
          if (defEl.text()) {
            defEl.data('def', $(defEl[0]).text());
            defEl.text('');
          }
        });
        $('#hideOrder').prop('checked', true).trigger('change');
        $('#hideDef').prop('checked', true).trigger('change');
        break;

      case 'showAll':
        $.each($('li'), function() {
          let senEl = $(this).find('[data-sen-val]');
          let wdEl = $(this).find('[data-wd-val]');
          let defEl = $(this).find('[data-def]');

          if (wdEl.data('wd-val')) {
            wdEl.text($(wdEl[0]).data('wd-val'));
          }
          if (senEl.data('sen-val')) {
            senEl.text($(senEl[0]).data('sen-val'));
          }
          if (defEl.data('def')) {
            defEl.text($(defEl[0]).data('def'));
          }
        });
        $('#hideOrder').prop('checked', false).trigger('change');;
        $('#hideDef').prop('checked', false).trigger('change');;
        break;

      default:
        break;
    }

    $('input:radio[name=hideStuff]').prop('disabled', false);
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
  		$('#btnReset').click();
  		$('#showAll').click();
  		$('#controlsForm :input, #dublicateForm :input').prop('disabled', true);
  		$.each($('li'), function() {
  			$(this).find('[data-row], .definition').css('opacity', 0).on('mouseover', function() {
  				$(this).css('opacity', '');
  			});
  		});
  	} else {
  		$('#controlsForm :input, #dublicateForm :input').prop('disabled', false);
  		$.each($('li'), function() {
  			$(this).find('[data-row], .definition').css('opacity', '');
  		});
  	}
  });

  $('#shuffleItems').on('change', function(){
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

  $('#btnIncrease').on('click', function(){
    if (curSpeed >= 1.5) return;
    curSpeed += 0.1;
    $('#curSpeed').text(curSpeed.toFixed(1));
    $.each($('audio'), function() {
      this.playbackRate = curSpeed;
    });
  });
  $('#btnDecrease').on('click', function(){
    if (curSpeed <= 0.6) return;
    curSpeed -= 0.1;
    $('#curSpeed').text(curSpeed.toFixed(1));
    $.each($('audio'), function() {
      this.playbackRate = curSpeed;
    });
  });

  let curPlaying = -1;
  let audioState = 0;
  let audioArr = $('audio');

  $.each(audioArr, function(index) {
    $(this).on('play', function() {
      if (curPlaying != -1 && curPlaying != index) {
        audioArr[curPlaying].pause();
      }
      setTimeout(function() {
        $('#playPauseAudio').addClass('playing');
        curPlaying = index;
        audioState = 1;
      }, 10);
    });
    $(this).on('pause', function() {
      $('#playPauseAudio').removeClass('playing');
      audioState = 0;
    });
  });

  $('#playPauseAudio').on('click', function() {
    if (audioState == 0) {
      if (curPlaying == -1) {
        curPlaying = 0;
      }
      audioArr[curPlaying].play();
    } else {
      $.each(audioArr, function() {
        if (!this.paused) {
          this.pause();
        }
      });
    }
  });


});