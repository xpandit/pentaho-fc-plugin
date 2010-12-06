/**
 * In this file, we've a lot of table related DOM functions, that help us
 * easily manipulate tables using DOM.
*/
function appendRow(tblId, index)
{
	//This method helps append a row to the table at the specified index.
	//We take the index as 1-length
	var tbl = document.getElementById(tblId);	
	//If index is <1 or >tbl.rows.length, we add to end.
	if (index<1 || index>tbl.rows.length){
		index = tbl.rows.length + 1;
	}	
	var newRow = tbl.insertRow(index-1);		
	//Return the row
	return newRow;
}
function appendRowAtEnd(tblId)
{
	//This method helps append a row to the table at the end.
	var tbl = document.getElementById(tblId);
	var newRow = tbl.insertRow(tbl.rows.length);	
	//Return the row
	return newRow;
}
function deleteTableRow(tblId, index){
	//This method deletes a specified row.
	var tbl = document.getElementById(tblId);	
	//We can delete only if table has any rows and index is a valid value.
	if (tbl.rows.length>0 && index>0 && index<=tbl.rows.length){
		tbl.deleteRow(index-1);
	}
}
function deleteLastRow(tblId){
	//This method deletes the last row of table specified row.
	var tbl = document.getElementById(tblId);	
	//We can delete only if table has any rows.
	if (tbl.rows.length>0){
		tbl.deleteRow(tbl.rows.length-1);
	}
}

function getTableLen(tblId){
	//This method returns the number of rows in a table if it's defined
	var tbl = document.getElementById(tblId);
	if (tbl){
		return tbl.rows.length;
	}else{
		return -1;
	}
}
//var newCell = newRow.insertCell(0);
//newCell.innerHTML = 'Hello World!';	