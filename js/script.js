var phoneBookApp = angular.module("phoneBookApp", []);
phoneBookApp.controller("phoneBookController", function ($scope) {
    $scope.listContacts = [
          { name : "Тех. Поддержка" , number : "0660994545" }
    ];

    var regNames = {
      "Тех. Поддержка" : "0660994545"
    };

    var regNumbers = {
      "0660994545" : "Тех. Поддержка"
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

        if (pNumber in regNumbers) {
          if ( !confirm("Этот номер принадлежит контакту: " + regNumbers[pNumber] + ", перезаписать?") ) return;
          delContactBy('number', pNumber);
        }

        if (pName in regNames) {
          if ( !confirm("Вы уверены что хотите изменить номер для: " + pName + "?") ) return;
          delContactBy('name', pName);
        }

        $scope.listContacts.push({ name: pName, number: pNumber });
        regNames[pName] = pNumber;
        regNumbers[pNumber] = pName;
    }

    $scope.delContact = function (contact) {
      if ( !confirm("Вы уверены что хотите удалить контакт: " + contact.name + "?") ) return;
      delContactBy('name', contact.name);
    }

    $scope.editContact = function (contact) {
      $scope.pName = contact.name;
      $scope.pNumber = contact.number;
    }

    function delContactBy(property, value) {
      for (var i = 0; i < $scope.listContacts.length; i++) {
        if ( $scope.listContacts[i][property] != value) continue;
        delete regNames[$scope.listContacts[i].name];
        delete regNumbers[$scope.listContacts[i].number];
        $scope.listContacts.splice(i, 1);
        break;
      }
    }
});
