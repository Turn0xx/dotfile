defmodule TimeManagerWeb.Router do
  use TimeManagerWeb, :router



  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/api", TimeManagerWeb do
    pipe_through :api

    get "/users", UserController, :index
    get "/users/:id", UserController, :show
    post  "/users", UserController, :create
    put "/users/:id", UserController, :update
    delete "/users/:id", UserController, :delete

    get "/working_times/:userID", TimeTracking.Infrastructure.WorkingTimeController, :index
    get "/working_times/:userID/:id", TimeTracking.Infrastructure.WorkingTimeController, :show
    post "/working_times/:userID", TimeTracking.Infrastructure.WorkingTimeController, :create
    put "/working_times/:userID", TimeTracking.Infrastructure.WorkingTimeController, :update
    delete "/working_times/:id", TimeTracking.Infrastructure.WorkingTimeController, :delete


  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:time_manager, :dev_routes) do
    scope "/swagger" do
      forward "/", PhoenixSwagger.Plug.SwaggerUI, otp_app: :time_manager, swagger_file: "swagger.json"
    end

    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through([:fetch_session, :protect_from_forgery])

      live_dashboard "/dashboard", metrics: TimeManagerWeb.Telemetry
      forward("/mailbox", Plug.Swoosh.MailboxPreview)
    end
  end

  def swagger_info do
    %{
      info: %{
        version: "1.0",
        title: "My App"
      }
    }
  end
end
