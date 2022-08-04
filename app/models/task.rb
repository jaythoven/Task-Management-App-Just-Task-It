class Task < ApplicationRecord
    has_many :subtasks, dependent: :destroy
    has_many :usertasks, dependent: :destroy
    has_many :users, through: :usertasks
end
