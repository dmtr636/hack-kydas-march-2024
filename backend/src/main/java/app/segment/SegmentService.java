package app.segment;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SegmentService {
    public List<Integer> getSegmentIdsByUserId(Integer userId) {
        Map<Integer, List<Integer>> map = getSegmentsMap();
        List<Integer> segmentIds = map.get(userId);
        if (segmentIds == null) {
            return Collections.emptyList();
        }
        return segmentIds.stream().sorted(Collections.reverseOrder()).toList();
    }

    public List<Integer> getSegmentIds() {
        Map<Integer, List<Integer>> map = getSegmentsMap();
        List<Integer> segmentIds = new ArrayList<>();
        for (Map.Entry<Integer, List<Integer>> entry : map.entrySet()) {
            segmentIds.addAll(entry.getValue());
        }
        return segmentIds.stream().sorted().toList();
    }

    private Map<Integer, List<Integer>> getSegmentsMap() {
        Map<Integer, List<Integer>> map = new HashMap<>();
        map.put(2100, List.of(156, 278));
        map.put(2200, List.of(168, 290, 412));
        map.put(2300, List.of(180));
        map.put(2400, List.of(192, 314, 436, 158));
        map.put(2500, List.of(204, 326, 148, 370, 592));
        map.put(2600, List.of(216));
        map.put(2700, List.of(228, 350, 472, 194));
        map.put(2800, List.of());
        map.put(2900, List.of(240, 362, 484, 206, 428));
        map.put(3000, List.of(252, 374));
        map.put(3100, List.of(264, 386, 508, 230));
        map.put(3200, List.of(276, 398));
        map.put(3300, List.of(288, 410, 532, 254));
        map.put(3400, List.of(300, 422, 544, 166));
        map.put(3500, List.of(312, 434));
        map.put(3600, List.of(324, 446, 568, 190));
        map.put(3700, List.of(336, 458));
        map.put(3800, List.of(348, 470, 592, 214));
        map.put(3900, List.of(360, 482, 604, 226));
        map.put(4000, List.of(372, 494, 616, 238));
        map.put(4100, List.of(384, 506, 628, 250));
        map.put(4200, List.of(396, 518, 640, 262));
        return map;
    }

}
