# OrderTrackingApplication

Веб-приложение для отслеживания статуса заказов.

## Предварительные требования 

В проекте используется .NET Aspire. Чтобы с ним работать, требуется следующее:

- [.NET 8.0](https://dotnet.microsoft.com/download/dotnet/8.0) или [.NET 9.0](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- IDE:
	- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) версии 17.9 или выше (Опционально)
	- [Visual Studio Code](https://code.visualstudio.com/) (Опционально)
		- [C# Dev Kit: Extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) (Опционально)
	- [JetBrains Rider with .NET Aspire plugin](https://blog.jetbrains.com/dotnet/2024/02/19/jetbrains-rider-and-the-net-aspire-plugin/) (Опционально)
- [Node.js](https://nodejs.org/en/download) версии 20.х или выше

## Запуск

Прежде, чем запускать:
1. Запустите docker
2. Установите при необходимости зависимости `npm i` клиентского приложения в папке `Client` (Опционально)

Имеется два способа запуска приложения:
1. Через aspire
2. Стандартный - каждое приложение в отдельности

Способ 1. Чтобы запустить через aspire можно использовать cli
```shell
dotnet run --project Server/Aspire.AppHost
```
Или через IDE запустить проект Aspire.AppHost. В итоге запустится дашборд и поднимутся все контейнеры, связи.

Способ 2. 

> В этом способе придется вручную конфигурировать все строки соединения и вручную запускать контейнеры. 

Основными приложениями являются `Server/Orders` и `Client`.

Серверное приложение запускается аналогично 1-му способу. 
Клиентское приложение запускается командой `npm run dev` из папки `Client`.


##  Стек

**Backend:**
- .NET 8, ASP.NET Core Web API
- EF Core
- PostgreSQL
- RabbitMQ
- .NET Aspire для локальной оркестрации и observability
- OpenTelemetry для метрик, трассировки и логов
  
**Frontend:**
- TypeScript
- React
- Server-sent events
- Zustand

