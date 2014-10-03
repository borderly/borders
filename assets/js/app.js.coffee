$.ajax
  type: 'GET'
  url: '/api'
  success: (data) ->
    console.log data
    $('body').append(data.message)
    return
