defmodule TimeManager.TimeTracking.Infrastructure.WorkingTimePresenter do
  alias TimeManager.TimeTracking.WorkingTime

  def present_working_time(%{working_time: %WorkingTime{} = working_time}) do
    %{
      id: working_time.id,
      start_time: working_time.start_time,
      end_time: working_time.end_time,
      user_id: working_time.user_id
    }
  end

  def present_working_times(%{working_times: working_times}) do
    %{data: for(working_time <- working_times, do: present_working_time(%{working_time: working_time}))}
  end
end
