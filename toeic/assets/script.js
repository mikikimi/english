$(document).ready(function() {

	const orgList = $('li');

  $('#hideOrder').on("change", function() {
  	console.log($(this));
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

      case 'hideOrder':

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
        break;

      case 'showAll':
        $.each($('li'), function() {
          let senEl = $(this).find('[data-sen-val]');
          let wdEl = $(this).find('[data-wd-val]');
          let defEl = $(this).find('.definition');

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
    if (num > 0 && num < 100) {
      let el = $('li')[num - 1];

      if (el) {
        $('html,body').animate({
          scrollTop: $(el).offset().top - 30
        });
      }
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

  	if ($('#fadeStuff').is(':checked')) {
  		$('#fadeStuff').click();
  	}

  	if ($(this).is(':checked')) {
	  	let orgList = $('li');
	  	$('ul').html('').html(_.shuffle(_.cloneDeep(orgList.clone())));
	  } else {
  		$('#btnReset').click();
  		$('#showAll').click();
	  	$('ul').html('').html(_.cloneDeep(orgList));
	  }

  	$(this).prop('disbaled', false);
  })


  setTimeout(function() {
    console.clear();
  }, 500);


});