import { OrderStatusListEnum } from '../enums/OrderStatusList.enum';
import { NameId } from '../model/NameId.model';

export const statusList: Array<NameId> =
    [{ Id: 0, Name: 'All' },
    { Id: OrderStatusListEnum.TripStarted, Name: 'TripStarted' },
    { Id: OrderStatusListEnum.AtPickUp, Name: 'AtPickUp' },
    { Id: OrderStatusListEnum.Loading, Name: 'Loading' },
    { Id: OrderStatusListEnum.PickedUp, Name: 'PickedUp' },
    { Id: OrderStatusListEnum.InTransit, Name: 'InTransit' },
    { Id: OrderStatusListEnum.AtDropOff, Name: 'AtDropOff' },
    { Id: OrderStatusListEnum.Unloading, Name: 'Unloading' },
    { Id: OrderStatusListEnum.Delivered, Name: 'Delivered' },
    { Id: OrderStatusListEnum.Assigned, Name: 'Assigned' },
    { Id: OrderStatusListEnum.AttemptDelivery, Name: 'AttemptDelivery' },
    { Id: OrderStatusListEnum.AttemptPickUp, Name: 'AttemptPickUp' },
    { Id: OrderStatusListEnum.Cancelled, Name: 'Cancelled' },
    { Id: OrderStatusListEnum.Completed, Name: 'Completed' },
    { Id: OrderStatusListEnum.Pending, Name: 'Pending' },
    { Id: OrderStatusListEnum.Reviewed, Name: 'Reviewed' },
    { Id: OrderStatusListEnum.Submitted, Name: 'Submitted' }];
