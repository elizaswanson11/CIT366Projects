function Set() {
	
	
	this.intersection = function(listA, listB) {
    
	   var resultList = [];
       
	   if (listA === null || listB === null) {

	   	return null;

	   }

	   for (var i = 0; i < listA.length; i++) { //for every value in listA

           var nextValue = listA[i];

            //for every value in listB
            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) {
                    resultList.push(listB[j]); //add listB element to end of resultList
                    break;
                }
            }

	   }
       
	   return resultList;
	}
    
    
    
	this.union = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {

            return null;

        }

        var flag1 = this.symmetricDifference(listA, listB);
        for (var i = 0; i < flag1.length; i++) {
            resultList.push(flag1[i]);
        }

        var flag2 = this.intersection(listA, listB);
        for (var i = 0; i < flag2.length; i++) {
            resultList.push(flag2[i])
        }
	   
	   return resultList;
	}




	this.relativeComplement = function(listA, listB) {

        var resultList = [];

        if (listA === null || listB === null) {

            return null;

        }

        for (var i = 0; i < listA.length; i++) { //for every value in listA

            var nextValue = listA[i];

            var flag = false;

            //for every value in listB
            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) {
                    flag = true;
                    break;
                }
            }

            if(!flag) {
                resultList.push(listA[i]);
            }
        }

        return resultList;
    }


	this.symmetricDifference = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {

            return null;

        }

        var flag1 = this.relativeComplement(listA, listB)
        for (var i = 0; i < flag1.length; i++) { //for every value in listA
            resultList.push(flag1[i]);
        }

        var flag2 = this.relativeComplement(listB, listA)
        for (var i = 0; i < flag2.length; i++) { //for every value in listA
            resultList.push(flag2[i]);
        }
       
	   return resultList;
	}	
	

}
