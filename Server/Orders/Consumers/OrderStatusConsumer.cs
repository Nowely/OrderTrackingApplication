using MassTransit;
using Orders.Api.Services;

namespace Orders.Consumers;

// MassTransit Consumer
/// <summary> </summary>
public class OrderStatusConsumer(OrderStatusSubscriptionService service) : IConsumer<OrderStatusMessage> {
	/// <summary> </summary>
	public async Task Consume(ConsumeContext<OrderStatusMessage> context) {
		await service.BroadcastAsync(context.Message);
	}
}