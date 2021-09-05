require "test_helper"

class Api::V1::CutOffControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_cut_off_index_url
    assert_response :success
  end
end
