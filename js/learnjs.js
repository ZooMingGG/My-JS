'use strict';
// let company = {
//     sales: [{
//       name: 'John',
//       salary: 1000
//     }, {
//       name: 'Alice',
//       salary: 600
//     }],
  
//     development: {
//       sites: [{
//         name: 'Peter',
//         salary: 2000
//       }, {
//         name: 'Alex',
//         salary: 1800
//       }],
  
//       internals: [{
//         name: 'Jack',
//         salary: 1300
//       }]
//     }
// };

// function sumAllSalarys(obj) {
//     if (Array.isArray(obj)) {
//         return obj.reduce((sum, current) => {
//             return sum + current.salary;
//         }, 0);
//     }

//     let sum = 0;

//     for (let subArr of Object.values(obj)) {
//         sum += sumAllSalarys(subArr);
//     }

//     return sum;
// }

// console.log( sumAllSalarys(company) );

/*=======================================================================*/

// let users = [
//     { name: "John", age: 20, surname: "Johnson" },
//     { name: "Pete", age: 18, surname: "Peterson" },
//     { name: "Ann", age: 19, surname: "Hathaway" }
// ];

// function byField(field) {
//     return function(a, b) {
//         return (a[field] > b[field]) ? 1 : -1;
//     };
// }

// console.log( users.sort(byField('name')) );
// console.log( users.sort(byField('age')) );

/*======================================================*/

/*======================== My slice ========================*/
// Array.prototype.mySlice = function(start = 0, end = this.length) {
//     let resultArr = [];

//     this.forEach((item, index) => {
//         if (index >= start && index < end) {
//             resultArr.push(item);
//         }
//     });

//     return resultArr;
// };

/*======================== My forEach ========================*/
// Array.prototype.myForEach = function(callback) {
//     for (let index = 0; index < this.length; index++) {
//         this[index] = ( callback(this[index], index, this) );
//     }
// };

/*======================== My map ========================*/
// Array.prototype.myMap = function(callback) {
//     let resultArr = [];

//     for (let index = 0; index < this.length; index++) {
//         resultArr.push( callback(this[index], index, this) );
//     }

//     return resultArr;
// };

/*======================== My Find ========================*/
// Array.prototype.myFind = function(callback) {
//     let result;
//
//     for (let index = 0; index < this.length; index++) {
//         if (callback(this[index], index, this)) {
//             result = this[index];
//         }
//     }
//
//     return result;
// };


/*======================== My Filter ========================*/
// Array.prototype.myFilter = function(callback) {
//     let result= [];

//     for (let index = 0; index < this.length; index++) {
//         if (callback(this[index], index, this)) {
//             result.push(this[index]);
//         }
//     }

//     return result;
// };

///////////////////////////////////////////////// Proxy //////////////

// let arr = [];
// arr = new Proxy(arr, {
//     set(target, property, value) {
//         if (typeof value === 'number') {
//             target[property] = value;
//             return true;
//         } else {
//             return false;
//         }
//     }
// });
// arr.push(1);
// arr.push('asd');
// console.log(arr);

// let array = [1, 2, 3];

// array = new Proxy(array, {
//   get(target, property, reciever) {
//       if (property < 0) {
//           property =  +property + target.length;
//           return Reflect.get(target, property, reciever);
//       }
//   }
// });

// console.log( array[-1] ); // 3
// console.log( array[-2] ); // 2
