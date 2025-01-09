defmodule TimeManager.TimeTracking.WorkingTime do
  use TimeManager, :domain_model

  alias TimeManager.Accounts.User
  alias TimeManager.TimeTracking.WorkingTime

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "working_times" do
    field :start_time, :utc_datetime
    field :end_time, :utc_datetime
    belongs_to :user, User

    timestamps(type: :utc_datetime)
  end

  def changeset(working_time, attrs) do
    IO.puts("WorkingTime.changeset")
    IO.inspect(working_time)
    IO.inspect(attrs)

    working_time
    |> cast(attrs, [:start_time, :end_time])
    |> cast_assoc(:user)
  end
end
