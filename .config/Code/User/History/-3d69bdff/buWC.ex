defmodule TimeManager.User do
  @moduledoc false

  use TimeManager, :domain_model

  schema "users" do
    field :username, :string
    field :email, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def new(%{username: username, email: email}) do
    %@self{username: username, email: email}
  end

  defp create_user(%{username: username, email: email}) when is_nil(username) or is_nil(email) do
    {:error, "Username and email are required"}
    %@self{username: username, email: email}
  end
end
