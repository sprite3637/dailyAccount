angular.module('daily', [])
  .controller('dailyController', function ($http) {
    var ctrl = this
    ctrl.daily = []

    ctrl.getdata = function () {
      $http.get('/db').then(function (response) {
        ctrl.daily = response.data
      })
    }

    ctrl.getdata()

    ctrl.submit = function (data) {
      data = {list: data.list, count: data.count}
      $http.post('/', data).then(function (response) {
        console.log(response.data)
        ctrl.daily.push(response.data)
      })
    }

    ctrl.delete = function (id, index) {
      console.log(id)
      $http.delete('/db/' + id)
        .success(function (data) {
          alert('delete')
          ctrl.daily.splice(index, 1)
        })
        .error(function (data) {
          alert('error')
          console.log('Error: ' + data)
        })
    }
  })
