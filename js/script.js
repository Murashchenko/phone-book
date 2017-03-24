var model = {
    items: [
      { name : "Вася" , number : "0660994545" }
    ]
};
var phoneBookApp = angular.module("phoneBookApp", []);
phoneBookApp.controller("phoneBookController", function ($scope) {
    $scope.list = model;

    var regNames = {
      "Вася" : "0660994545"
    };

    var regNumbers = {
      "0660994545" : "Вася"
    };

    $scope.addContact = function (pName, pNumber) {
        if (!pName) {
          alert("Имя не введено");
          return;
        }
        if (isNaN( parseFloat(pNumber) ) || !isFinite(pNumber)) {
          alert("Номер должен быть числом");
          return;
        }
        if ( pNumber.length != 10) {
          alert("номер должен быть 10-ти значным");
          return;
        }
        if (pName in regNames) {
          alert("Контакт с таким именем уже существует");
          return;
        }
        if (pNumber in regNumbers) {
          alert("Этот номер принадлежит контакту: " + regNumbers[pNumber]);
          return;
        }

        $scope.list.items.push({ name: pName, number: pNumber });
        regNames[pName] = pNumber;
        regNumbers[pNumber] = pName;
    }

    $scope.delContact = function (item) {
      if ( !confirm("Вы уверены что хотите удалить контакт?") ) return;
      delete regNames[item.name];
      delete regNumbers[item.number];

      for (var i = 0; i < $scope.list.items.length; i++) {
        if (item != $scope.list.items[i]) continue;

        $scope.list.items.splice(i, 1);
        return;
      }

    }
});
