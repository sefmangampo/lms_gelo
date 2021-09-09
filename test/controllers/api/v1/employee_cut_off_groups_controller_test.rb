require "test_helper"

class Api::V1::EmployeeCutOffGroupsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_employee_cut_off_groups_index_url
    assert_response :success
  end
end
