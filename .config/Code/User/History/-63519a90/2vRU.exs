defmodule TimeManager.Repo.Migrations.CreateWorkingTimes do
  use Ecto.Migration

  def change do
    create table(:working_times, primary_key: false) do
      add :id, :binary_id, primary_key: true  # Définit id comme une clé primaire
      add :start_time, :utc_datetime, null: false  # Colonne pour l'heure de début
      add :end_time, :utc_datetime, null: false  # Colonne pour l'heure de fin
      add :user_id, :binary_id, null: false  # Colonne pour l'identifiant de l'utilisateur

      timestamps(type: :utc_datetime)  # Ajoute les colonnes insérées à l'heure UTC
    end

    # Ajoute une contrainte de clé étrangère pour user_id
    create index(:working_times, [:user_id])  # Index pour user_id
    alter table(:working_times) do
      add constraint(:working_times_user_id_fkey, foreign_key(:user_id, references: :users, type: :binary_id))
    end
  end
end
