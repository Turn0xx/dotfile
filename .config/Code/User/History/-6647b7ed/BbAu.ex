defmodule TimeManager.User do
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

  defp set_username(%{username: username}, user) when is_nil()
end
