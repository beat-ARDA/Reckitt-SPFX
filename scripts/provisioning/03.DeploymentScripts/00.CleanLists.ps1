function DeleteList($listName)
{
    Write-Host "Starting to delete list" $listName
    Remove-PnPList -Identity $listName -Force
}


DeleteList "Aprobadores"
DeleteList "Canales"
DeleteList 'Categor�as'
DeleteList "Categor�as de producto"
DeleteList "Clientes"
DeleteList "Configuraci�n" 
DeleteList "Marcas"
DeleteList "NotificationTemplates"
DeleteList "Productos"
DeleteList "Productos por cliente"
DeleteList "Subcanales"
DeleteList "Tipos" 
DeleteList "Unidades de negocio"
DeleteList "Vol�menes del �ltimo a�o"

DeleteList "Promo items"
DeleteList "Promociones"
DeleteList "Workflow log"
DeleteList "SYS_PermissionChangeRequests"
DeleteList "Evidence"