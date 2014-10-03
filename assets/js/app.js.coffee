#= require lodash
#= require jquery

$.ajax
  type: 'GET'
  url: '/api/laws'
  success: (data) ->
    console.log data
    _.each data, (data) ->
      console.log data.section
      $('body').append "section: #{data.section}<br>title: #{data.title}<br>state: #{data.state}<br>county: #{data.county}<br>law: #{data.law}<br><br>"
      return
    return
