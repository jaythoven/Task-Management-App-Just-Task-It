class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :completed
  has_many :subtasks
  has_many :users
end
