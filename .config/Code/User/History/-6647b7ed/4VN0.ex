defmodule TimeManager.User do
  use TimeManager, :domain_model

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users" do
    field :username, :string
    field :email, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def new(%{"username" => username, "email" => email}) do
    %@self{}
    |> set_username(username)
    |> set_email(email)
  end

  @doc false
  def new(user) do
    user
    |> set_username(user.username)
    |> set_email(user.email)
  end

  def update_user(%@self{} = user, params) do
    user
    |> set_username(Map.get(params, "username"))
    |> set_email(Map.get(params, "email"))
  end

  defp set_username(user, username) when is_nil(username) == false do
    %{user | username: username}
  end

  defp set_email(user, email) when is_nil(email) == false do
    %{user | email: email}
  end
end
