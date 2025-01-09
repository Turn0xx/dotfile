defmodule TimeManager.User do
  @moduledoc false

  use TimeManager, :domain_model

  schema "users" do
    field :username, :string
    field :email, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def new(attrs) do
    %__MODULE__{}
    |> cast(attrs, [:username, :email])
    |> validate_required([:username, :email])
    |> unique_constraint(:email)
  end
end
