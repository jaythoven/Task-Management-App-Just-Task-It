class UsertaskSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :task_id
  # has_one :user
  # has_one :task
end
