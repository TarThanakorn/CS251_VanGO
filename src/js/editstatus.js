angular.module("formModule", [])
.controller("formController", function ($scope, $http, $sce) {
	$scope.init = function () {
		$http({
			url: "http://localhost:3000/fetchAllRoute",
			method: "GET",
		}).then(function (response) {
            console.log(response)
			var strTable = '<table><tr> <th>ID</th> <th>วันที่</th> <th>เวลา</th> <th>ต้นทาง</th> <th>ปลายทาง</th> <th>สถานะ</th> <th>แก้ไขสถานะ</th> </tr>';
			if(response.data[0].length!= 0){
				result = response.data;
                console.log(result)
				for(var row in result){
					strTable = strTable+'<tr>';
					strTable = strTable+'<td style="width:5%"><label><center>#' + result[row].RouteID + '</center></label></td>';
					strTable = strTable+'<td style="width:20%"><label><center>' + result[row].RDate + '</center></label></td>';
                    strTable = strTable+'<td><label><center>' + result[row].RTime + '</center></label></td>';
                    strTable = strTable+'<td><label><center>' + rdp(result[row].REnter) + '</center></label></td>';
                    strTable = strTable+'<td><label><center>' + rdp(result[row].RExit) + '</center></label></td>';
					if (result[row].RStatus == 1)
						strTable = strTable+'<td><label><center>ยังไม่ออกเดินทาง</center></label></td>';
                    if (result[row].RStatus == 2)
						strTable = strTable+'<td><label><center>เตรียมตัวออกเดินทาง</center></label></td>';
                    if (result[row].RStatus == 3)
						strTable = strTable+'<td><label><center>กำลังเดินทาง</center></label></td>';
                    if (result[row].RStatus == 4)
						strTable = strTable+'<td><label><center>ถึงจุดหมายแล้ว</center></label></td>';
					strTable = strTable+'<td><label><center><a href="/editst?rid='+result[row].RouteID+'" style = "color : green">แก้ไข</a></center></label></td>';
					strTable = strTable+'</tr>';
				}
			}
			strTable = strTable+'</table>';
			$scope.table = $sce.trustAsHtml(strTable);
		});
		
	}
});

function rdp(routecode){
    if(routecode == 1)
        return 'ม.ธรรมศาสตร์';
    else if(routecode == 2)
        return 'ฟิวเจอร์ปาร์ค';
    else if(routecode == 3)
        return 'อนุสาวรีย์ชัยฯ';
    else if(routecode == 4)
        return 'BTSหมอชิต';
}