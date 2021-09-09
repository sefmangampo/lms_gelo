require "test_helper"

class Api::V1::EmployeeCutOffGroupMembersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_employee_cut_off_group_members_index_url
    assert_response :success
  end
end
