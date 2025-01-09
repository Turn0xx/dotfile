defmodule TimeManager.Repo.Migrations.CreateWorkingTimes do
  use Ecto.Migration

  def change do
    create table(:working_times, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :start_time, :utc_datetime, null: false
      add :end_time, :utc_datetime, null: false
      add :user_id, references(:users, type: :binary_id), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:working_times, [:user_id])
  end
end
