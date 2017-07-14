//Create verbal frequencies -- frequent, infrequent, and rare

//Get all the side effects for a particular medication

function MedSideEffectsVerbal(medName, componentArray) {

	var FLOAT_UNDEFINED = -1.0;

	SideEffectsClass = function(init) {
		this.verbalFrequency = init.verbalFrequency;
		this.numFrequency = init.numFrequency;
		this.sideEffectName = init.sideEffectName;
		this.freqMin = FLOAT_UNDEFINED;
		this.freqMax = FLOAT_UNDEFINED;
		this.vFreqMin = "";
		this.vFreqMax = "";
		this.totalFrequency = init.totalFrequency;
		this.averageFrequency = FLOAT_UNDEFINED;

	}; 
	
	copySideEffectsObject = function(from, to) {
		to.freqMin = from.freqMin;
		to.freqMax = from.freqMax;
		to.vFreqMin = from.vFreqMin;
		to.vFreqMax = from.vFreqMax;
		to.numFrequency = from.numFrequency;
		to.verbalFrequency = from.verbalFrequency;
		to.totalFrequency = from.totalFrequency;
		to.averageFrequency = from.averageFrequency;
		to.sideEffectName = from.sideEffectName;
		return to;
	};
	
	 makeFrequencyText = function(rowObject){
	 	var allText;
        var frequency = rowObject.averageFrequency;
        if (frequency > 1.0) allText = "frequent";
        else if (frequency > .1) allText = "infrequent";
        else if (frequency > 0.0) allText = "rare";
        else allText = "";
        return allText;
   };

   compareFreqForSort = function(a,b){
          if (a.averageFrequency > b.averageFrequency) {
            return -1;       
          } else if (a.averageFrequency < b.averageFrequency) {
            return 1;       
          }
          return 0;  
          
          
                
    };

	//Frequency for a given side effect expressed as a single number
	collapseRows = function(origArray) {

		origArray.sort(compareFuncForSort);

		var accumulator = new SideEffectsClass(origArray[0]);
		//newArray = new SideEffectsClass()[origArray.length];
		var newArray = new Array(origArray.length);
		var numRepeats = 1;
		var i = 1;
		var j = 0;

		accumulator.averageFrequency = 0;
		if (origArray[0].numFrequency != FLOAT_UNDEFINED)
			accumulator.totalFrequency = origArray[0].numFrequency;
		else if (origArray[0].verbalFrequency != "")
			accumulator.totalFrequency = convertToNumeric(origArray[0].verbalFrequency);
		else
			accumulator.totalFrequency = 0;

		while (i < origArray.length) {
			if (compareFuncForCollapse(accumulator, origArray[i]) === 0) {
				numRepeats++;
				if (origArray[i].numFrequency != FLOAT_UNDEFINED) {
					accumulator.totalFrequency += origArray[i].numFrequency;
				} else if (origArray[i].verbalFrequency != "") {
					accumulator.totalFrequency += convertToNumeric(origArray[i].verbalFrequency);
				}

				i += 1;

			} else {
				if (numRepeats != 0) {
					newArray[j] = new SideEffectsClass(accumulator);
					newArray[j].averageFrequency = newArray[j].totalFrequency / numRepeats;
					numRepeats = 0;
					newArray[j].totalFrequency = 0;
				}
				//This is for cases where there is only one occurrence of a side effect
				else {
					newArray[j] = new SideEffectsClass(origArray[i - 1]);
					if (origArray[i - 1].numFrequency != FLOAT_UNDEFINED)
						newArray[j].averageFrequency = origArray[i - 1].numFrequency;
					else
						newArray[j].averageFrequency = convertToNumeric(origArray[i - 1].verbalFrequency);

				}
				accumulator = copySideEffectsObject(origArray[i], accumulator);
				if (origArray[i].numFrequency != FLOAT_UNDEFINED)
					accumulator.totalFrequency = origArray[i].numFrequency;
				else if (origArray[i].verbalFrequency != "")
					accumulator.totalFrequency = convertToNumeric(origArray[i].verbalFrequency);
				else
					accumulator.totalFrequency = 0;
				numRepeats++;
				j++;

				i++;
			}
		}
		//Pick up the last symptom
		if (numRepeats != 0) {
			newArray[j] = new SideEffectsClass(accumulator);

			newArray[j].averageFrequency = newArray[j].totalFrequency / numRepeats;

		}
		//This is for cases where there is only one occurrence of a side effect
		else {
			newArray[j] = new SideEffectsClass(origArray[i - 1]);

			if (origArray[i - 1].numFrequency != FLOAT_UNDEFINED)
				newArray[j].averageFrequency = origArray[i - 1].numFrequency;
			else
				newArray[j].averageFrequency = convertToNumeric(origArray[i - 1].verbalFrequency);

		}
		var averageFrequencyIsZero = true;
		for (k=0; k<newArray.length; k++) {
		  if (newArray[k].averageFrequency != 0) {
		    averageFrequencyIsZero = false;
		    break;
		  } 
		}
		if (averageFrequencyIsZero == false){  
		  newArray.sort(compareFreqForSort);
		}
		return newArray;

	};
}

