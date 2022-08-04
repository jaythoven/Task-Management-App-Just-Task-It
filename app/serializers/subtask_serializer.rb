class SubtaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :completed, :task_id, :user_id
  # has_one :user
  # has_one :task
end
