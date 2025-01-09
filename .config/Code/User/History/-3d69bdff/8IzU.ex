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
    %@self{}
    |> create_user(%{username: username, email: email})
  end

  defp create_user(%{username: username, email: email}) do
    %@self{username: username, email: email}
  end
end
