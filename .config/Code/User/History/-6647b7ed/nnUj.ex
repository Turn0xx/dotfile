defmodule TimeManager.User do
  use TimeManager, :domain_model

  schema "users" do
    field :id, :id
    field :username, :string
    field :email, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def new(%{username: username, email: email}) do
    %@self{}
    |> set_username(username)
    |> set_email(email)
  end

  def update_user(

  defp set_username(%{username: username}, user) when is_nil(username) == false do
    %{user | username: username}
  end

  defp set_email(%{email: email}, user) when is_nil(email) == false do
    %{user | email: email}
  end
end
